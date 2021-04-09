import { modelOptions, prop } from '@typegoose/typegoose';

import { MongoBaseModel } from '../../../../base/typegoose/base.model';

// Generated by GENERATOR: 11/29/2020, 12:23:56 PM


@modelOptions({ schemaOptions: { collection: "element" } })
export class Element extends MongoBaseModel {
  @prop({ required: true, maxlength: 50 })
  public name: string
}
