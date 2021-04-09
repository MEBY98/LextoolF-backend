// import { Pagination } from '../../../../';
export interface GetManyResult<T> {
    elements: T[],
    // pagination: Pagination
    pagination: any
}

export interface GetManyDistinct<T> {
    elements: T[],
    count: Number
}


export interface UpdateManyResult {
    n: Number;  // Number of documents matched
    nModified: Number; // Number of documents modified
}

export interface DeleteManyResult {
    ok?: Number  // 1 if no errors occurred
    deletedCount?: Number  // the number of documents deleted
    n?: Number  // the number of documents deleted. Equal to deletedCount.
}
