import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';

@Injectable()
export class ConfigurationService {
  getMongoURL() {
    dotenv.config();
    console.log(process.env.MONGO_URL);
    return process.env.MONGO_URL;
  }
}
