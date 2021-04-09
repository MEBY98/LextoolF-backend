import { modelOptions, prop } from '@typegoose/typegoose';

import { MongoBaseModel } from '../../base/typegoose/base.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends MongoBaseModel {

    @prop({ required: true, maxlength: 80 })
    public name: string

    @prop({ required: true, unique: true })
    public email: string

    @prop()
    public passwordHash: string;

    // TODO:
    @prop()
    public salt: string;

    @prop()
    public imgProfile: string;

    @prop()
    public meta: object

    @prop({ required: true, default: false })
    public active: boolean
}
