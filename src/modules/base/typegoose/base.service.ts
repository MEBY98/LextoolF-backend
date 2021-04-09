import { InternalServerErrorException, Logger, Type } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { DEFAULT_PAGINATION } from '../interfaces/pagination';
import { Params } from '../interfaces/params.interface';
import {
    DeleteManyResult,
    GetManyInput,
    PaginationInput,
    Populate,
    UpdateManyResult,
} from './../../shared/graphql/shared.schema';
import { GetManyResult } from './../interfaces/getManyResult';
import { MongoBaseModel } from './base.model';
import { IBaseService, Sc } from './IBase.service';

import type { Types } from 'mongoose';
export function BaseService<T extends MongoBaseModel>(objectClass): Type<IBaseService<T>> {

    class BaseServiceInner<T> implements IBaseService<T> {
        @InjectModel(objectClass) model: ReturnModelType<typeof objectClass>

        async getMany(getManyInput: GetManyInput, lean: Boolean = true): Promise<GetManyResult<T>> {

            const params: Params = getManyInput.params || {}
            const paginationInput: PaginationInput = getManyInput.paginationInput || DEFAULT_PAGINATION

            const {
                page,
                limit,
                skip,
                // Only for cursor based pagination
                startingAfter,
            } = paginationInput;

            const skipCount = (page - 1) * limit + (skip || 0);
            const sort = params.sort || null

            let allElements;
            let elements;
            let total;

            try {
                if (params.aggregate) {
                    const aggregate = params.aggregate;

                    //Pagination
                    aggregate.push({
                        $skip: skipCount
                    });
                    if (sort) {
                        aggregate.push({
                            $sort: sort
                        });
                    }
                    aggregate.push({
                        $limit: limit
                    });


                    allElements = this.model.aggregate(aggregate);
                    elements = await allElements;

                    if (params.populate) {
                        params.populate.forEach(async populate => {
                            elements = await this.model.populate(elements, populate)
                        });

                    }
                } else {
                    const find = params.where || {}
                    allElements = this.model.find(find)
                    if (lean) {
                        /**
                         *   Lean option for makes queries faster and less memory intensive
                         *    @see -> Faster Mongoose Queries With Lean
                         **/
                        allElements.lean();
                    }

                    if (params.select) {
                        allElements.select(params.select)
                    }

                    if (params.populate) {
                        params.populate.forEach(populate => {
                            allElements.populate(populate)
                        });
                    }

                    /**
                     *   Mongoose distinct does not support pagination
                     **/
                    if (!params.distinct) {
                        if (sort) {
                            allElements.sort(sort);
                        }
                        allElements.skip(skipCount).limit(limit)
                        total = await this.model.countDocuments(find)
                        elements = await allElements;
                    } else {
                        allElements.distinct(params.distinct)
                        elements = await allElements;
                        total = elements.length
                    }

                }
            } catch (err) {
                Logger.debug(err, 'getManyError')
                throw new InternalServerErrorException()
            }

            const pagination = {
                totalElements: total,
                hasNextPage: limit * page < total,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(total / limit),
            };

            return {
                elements,
                pagination,
            };
        }

        async getOne(params: object, populate?: Populate[], select?: string): Promise<DocumentType<T>> {
            try {
                const element = this.model.findOne(params)
                if (select) {
                    element.select(select)
                }
                if (populate) {
                    populate.forEach(populate => {
                        element.populate(populate)
                    });
                }

                return await element

            } catch (error) {
                Logger.debug(error, 'getOne BaseService')
                throw new InternalServerErrorException()
            }
        }

        /**
         *   Lean option for makes queries faster and less memory intensive
         *    @see -> Faster Mongoose Queries With Lean
         **/
        async getOneLean(params: object, populate?: Populate[], select?: string): Promise<DocumentType<T>> {
            try {


                const element = this.model.findOne(params)
                if (select) {
                    element.select(select)
                }
                if (populate) {
                    populate.forEach(populate => {
                        element.populate(populate)
                    });
                }
                element.lean()
                return await element
            } catch (error) {
                Logger.debug(error, 'getOneLean BaseService')
                throw new InternalServerErrorException()
            }
        }

        async getById(id: string | Types.ObjectId, populate?: Populate[], select?: string): Promise<DocumentType<T>> {
            try {
                const element = this.model.findById(id)
                if (select) {
                    element.select(select);
                }
                if (populate) {
                    populate.forEach(populate => {
                        element.populate(populate)
                    });
                }
                return await element
            } catch (error) {
                Logger.debug(error, 'getById BaseService')
                throw new InternalServerErrorException()
            }
        }

        async getByIdLean(id: string | Types.ObjectId, populate?: Populate[], select?: string): Promise<DocumentType<T>> {
            try {
                const element = this.model.findById(id).select(select);
                if (populate) {
                    populate.forEach(populate => {
                        element.populate(populate)
                    });
                }
                return await element.lean()

            } catch (error) {
                Logger.debug(error, 'getByIdLean BaseService')
                throw new InternalServerErrorException()
            }
        }

        async count(params = {}): Promise<number> {
            return await this.model.countDocuments(params)
        }

        async exists(find: object): Promise<boolean> {
            return await this.model.exists(find)
        }

        async updateById(id: string | Types.ObjectId, entity: Partial<T>): Promise<DocumentType<T>> {
            return await this.model.findByIdAndUpdate(id, entity);
        }

        async updateOne(where: object, entity: Partial<T>): Promise<DocumentType<T>> {
            return await this.model.updateOne(where, entity);
        }

        async deleteById(id: string | Types.ObjectId): Promise<any> {
            try {
                const element = await this.model.findByIdAndDelete(id);
                return element;
            } catch (error) {
                Logger.debug(error, 'deleteById error BaseService')
                throw new InternalServerErrorException()
            }
        }

        async updateMany(conditions: object, params: Partial<T>): Promise<UpdateManyResult> {
            try {
                const updated = await this.model.updateMany(conditions, params);
                return updated;
            } catch (error) {
                Logger.debug(error, 'updateMany BaseService')
                throw new InternalServerErrorException()
            }
        }

        async deleteMany(conditions: object): Promise<DeleteManyResult> {
            try {
                return await this.model.deleteMany(conditions);
            } catch (error) {
                Logger.debug(error, 'deleteMany BaseService')
                throw new InternalServerErrorException()
            }
        }

        async deleteOne(conditions: object): Promise<DocumentType<T>> {
            try {
                return await this.model.findOneAndDelete(conditions);
            } catch (error) {
                Logger.debug(error, 'deleteOne BaseService')
                throw new InternalServerErrorException()
            }
        }

        async create(entity: Partial<T & Sc>): Promise<DocumentType<T>> {
            try {
                const element = await this.model.create(entity);
                return element;

            } catch (error) {
                Logger.debug(error, 'create BaseService')
                throw new InternalServerErrorException(error)
            }
        }

        async createMany(entities: Partial<T & Sc>[]): Promise<DocumentType<T[]>> {
            try {
                const elements = await this.model.create(entities);
                return elements;

            } catch (error) {
                Logger.debug(error, 'createMany BaseService')
                throw new InternalServerErrorException(error)
            }
        }

        async distinct(field, conditions = {}): Promise<string[]> {
            return this.model.distinct(field, conditions)
        }
    }

    return BaseServiceInner
}
