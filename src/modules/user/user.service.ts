import { Injectable } from '@nestjs/common';

import { BaseService } from '../base/typegoose/base.service';
import { User } from './models/user.model';

@Injectable()
export class UserService extends BaseService<User>(User) { }
