import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";

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