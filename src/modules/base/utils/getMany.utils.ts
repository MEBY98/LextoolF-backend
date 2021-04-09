import { GetManyInput } from "../interfaces/getManyInput"
import { GetManyResult } from "../interfaces/getManyResult";
import { Populate } from './../../shared/graphql/shared.schema';

export const includeInParams = (getMany: GetManyInput, findParams?: object, populateParams?: Populate[] | Populate): GetManyInput => {
    if (findParams) {
        getMany = includeInFindParams(getMany, findParams)
    }
    if (populateParams) {
        getMany = includeInPopulateParams(getMany, populateParams)
    }
    return getMany
}

export const includeInFindParams = (getMany: GetManyInput, findParams: object): GetManyInput => {
    const find = getMany.params.where

    if (find) {
        getMany.params.where = { ...findParams, ...find }
    }
    else {
        getMany.params.where = findParams
    }
    return getMany
}

export const includeInPopulateParams = (getMany: GetManyInput, populateParams: Populate[] | Populate) => {
    getMany.params.populate = getMany.params.populate || []
    if (Array.isArray(populateParams)) {
        getMany.params.populate.concat(populateParams)
    }
    else {
        getMany.params.populate.push(populateParams)
    }
    return getMany
}


export async function mapGetMany<T>(getMany: Promise<GetManyResult<T>>, name: string) {
    const { elements, pagination } = await getMany
    return { [name]: elements, pagination }
}
