import { Global, Module } from '@nestjs/common';
import { BcryptService } from './hash/bcrypt.service';
import { HashingServiceProtocol } from './hash/hashing.service';


@Global()
@Module({
    providers:
        [{
            provide: HashingServiceProtocol,
            useClass: BcryptService
        }], 

    exports: 
        [
        HashingServiceProtocol
        ]
},
   
)
export class AuthModule {}
