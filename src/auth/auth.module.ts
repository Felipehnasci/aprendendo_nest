import { Module } from '@nestjs/common';
import { BcryptService } from './hash/bcrypt.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Module(
    {providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService
        }],
    }   
)
export class AuthModule {}
