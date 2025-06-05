import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { hash } from 'crypto';
import { ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private prisma: PrismaService,
        private readonly hashingService: HashingServiceProtocol,
        
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService : JwtService
    ) {

        console.log("JWT Config:", this.jwtConfiguration);
    }

    async authenticate(signInDto: SignInDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: signInDto.email,
            },
        })

        if(!user) {
            throw new HttpException("Falha ao encontrar usuário", HttpStatus.UNAUTHORIZED)
        }
        
        const passwordIsValid = await this.hashingService.comparePassword(signInDto.passwordhash, user.passwordhash)

        if(!passwordIsValid) {
            throw new HttpException("Senha ou Email inválidos. ", HttpStatus.UNAUTHORIZED)
        }

        const token = await this.jwtService.signAsync(
            {
            sub: user.id,
            email: user.email,
            },
            {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            expiresIn: this.jwtConfiguration.jwtTtl,
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}