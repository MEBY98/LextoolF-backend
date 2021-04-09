import { DocumentType, ReturnModelType } from '@typegoose/typegoose';

import { GetManyInput } from '../interfaces/getManyInput';
import { DeleteManyResult, GetManyResult, UpdateManyResult } from '../interfaces/getManyResult';
import { Populate } from '../interfaces/params.interface';

import type { Types } from 'mongoose';
export interface Sc {
    __scenarios: string[]
}

export interface IBaseService<T> {
    model: ReturnModelType<new () => T>
    getById(id: string | Types.ObjectId, populate?: Populate[], select?: string): Promise<DocumentType<T>>;
    getByIdLean(id: string | Types.ObjectId, populate?: Populate[], select?: string): Promise<DocumentType<T>>;
    getOne(params: object, populate?: Populate[], select?: string): Promise<DocumentType<T>>;
    getOneLean(params: object, populate?: Populate[], select?: string): Promise<DocumentType<T>>;
    count(params: object): Promise<number>
    exists(find: object): Promise<boolean>
    deleteById(id: string | Types.ObjectId): Promise<DocumentType<T>>;
    getMany(getManyInput: GetManyInput, lean?: boolean): Promise<GetManyResult<T>>;
    updateById(id: string | Types.ObjectId, entity: Partial<T & Sc>): Promise<DocumentType<T>>;
    updateOne(where: object, entity: Partial<T>): Promise<DocumentType<T>>
    updateMany(conditions: object, params: object): Promise<UpdateManyResult>;
    deleteMany(params: object): Promise<DeleteManyResult>;
    deleteOne(params: object): Promise<DocumentType<T>>;
    create(entity: Partial<T & Sc>): Promise<DocumentType<T>>;
    createMany(entitys: Partial<T & Sc>[]): Promise<DocumentType<T[]>>;
    distinct(field: string, conditions?: object): Promise<string[]>
}
