import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { REQUEST_TOKEN_PAYLOAD_NAME } from "../common/auth.constant";

@Injectable()
export class AuthTokenGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request : Request = context.switchToHttp().getRequest()
        const token = this.extractTokenHeader(request)
        if (!token) {

            throw new UnauthorizedException("Token não encontrado no cabeçalho da requisição")
        }

        try{

            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration)
            request[REQUEST_TOKEN_PAYLOAD_NAME] = payload;

        }catch(err){
            console.log(err)
            throw new UnauthorizedException("Token inválido ou expirado")
        }

        console.log("Token:", token)
        return true
    }

    extractTokenHeader(request: Request) {
        const authorization = request.headers?.['authorization'] || request.headers?.['Authorization'];

        if(!authorization || typeof authorization !== 'string') {
            return null;
        }

        return authorization.split(' ')[1];
    }
}