import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { setLogLevel, LogLevels, modelOptions, Severity } from '@typegoose/typegoose';

setLogLevel(LogLevels.WARN);

export interface MongoBaseModel extends TimeStamps { }

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class MongoBaseModel extends Base { }
