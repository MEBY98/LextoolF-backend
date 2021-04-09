import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import bcrypt = require('bcryptjs');
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';

import { CreateUserInput } from '../user/graphql/user.schema';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { ConfigService } from './../shared/config/config.service';
import { LoginInputDto } from './dto/LoginInput.dto';


@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  //TODO: expiresIn time in miliseconds
  private expiresIn = (3600 * 24) * 1000; //  = 24h = 1d
  private RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'keys', 'private.pem'));
  private RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'keys', 'public.pem'));

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) { }
  get PrivateKey() {
    return this.RSA_PRIVATE_KEY
  }
  get PublicKey() {
    return this.RSA_PUBLIC_KEY
  }

  async registerUser(
    input: CreateUserInput,
  ) {
    let { password, email, name } = input;

    const accountExists = await this.userService.getOne({ email })
    if (accountExists && accountExists.active) {
      throw new ConflictException('Ya existe un usuario con ese correo registrado');
    } else if (accountExists && !accountExists.active) {
      await accountExists.remove()
    }

    const { passwordHash, salt } = await this.getHashWithSalt(password);
    delete input.password

    try {
      const newUser = { passwordHash, salt, ...input, name }
      await this.userService.create(newUser);

      return { status: 200, message: "Cuenta registrada" }

    } catch (error) {
      Logger.error(error, 'error')
      throw new InternalServerErrorException();
    }
  }

  async loginUser(input: LoginInputDto) {
    const { email, password } = input
    const user = await this.userService.getOne({ email, active: true });
    if (!user) {
      throw new BadRequestException();
    }

    const validCredentials = this.compareHash(password, user.passwordHash);
    if (!validCredentials) {
      throw new BadRequestException();
    }

    const { token, expiresIn } = await this.createToken(user)
    return { token, expiresIn, user };
  }

  async loginUserFromToken(user) {
    const { token, expiresIn } = await this.createToken(user)
    return { refreshToken: token, expiresIn };
  }

  private compareHash(password: string | undefined, hash: string | undefined): boolean {
    try {
      if (bcrypt.compareSync(password, hash)) {
        this.logger.log('Verification of user sucessful');
        return true;
      } else {
        this.logger.log('Verification of user failed');
        return false;
      }
    } catch (err) {
      this.logger.log('Bcrypt Error');
      return false;
    }
  }

  private async getHashWithSalt(password: string | undefined): Promise<any> {
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt);
    return { passwordHash, salt };
  }

  async createToken(user: User) {
    const { name, imgProfile, _id, email, } = user
    const payload = {
      name, imgProfile, _id, email,
    }

    const keyid = crypto.createHash('sha256').update(this.PublicKey).digest('hex');

    const token = jwt.sign({
      //  expires date in miliseconds, equal to expiresIn(in seconds) * 1000 miliseconds
      expiresAt: Math.floor(Date.now() + this.expiresIn),
      payload
    }, this.PrivateKey, {
      algorithm: 'RS256',
      expiresIn: this.expiresIn,
      subject: email,
      keyid,
    });

    return {
      expiresIn: this.expiresIn,
      token,
    };
  }

  async validateUser(signedUser): Promise<User> {
    if (signedUser && signedUser.sub) {
      const user = await this.userService.getOne({ email: signedUser.sub });
      return user
    }
    return null;
  }
}
