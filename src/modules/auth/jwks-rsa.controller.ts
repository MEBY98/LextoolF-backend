import { Controller, Get, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import rsaPemToJwk from 'rsa-pem-to-jwk';

@Controller('.well-known')
export class JwksRsaController {
    private logger = new Logger(JwksRsaController.name);

    @Get('jwks.object')
    async jwks() {
        // @TODO: Read all keys existing, find a way to expire and delete them after a certain time
        this.logger.log('jwks-rsa called');
        const jwk = [];
        const publicKey = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'keys', 'public.pem'));
        const keyid = crypto.createHash('sha256').update(publicKey).digest('hex');
        jwk.push(rsaPemToJwk(publicKey, { use: 'sig', alg: 'RSA256', kid: keyid }, 'public'));

        return { keys: jwk };
    }
}
