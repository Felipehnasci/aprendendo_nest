import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Payload } from 'generated/prisma/runtime/library';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService, 
        private readonly hashingService : HashingServiceProtocol
    ) {}

    async findAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true, email: true, name: true, createdAt: true, passwordhash: true, tasks: true
            }
        })
    }

    async findOneUser(id: number) {
        const user = await this.prisma.user.findFirst({
            where: { id },
            select: {
                id: true, email: true, name: true, createdAt: true, tasks: true
            }
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const passwordHash = await this.hashingService.hashPassword(createUserDto.password);
        try{
            const user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    passwordhash: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                }
            });
            return user;

        } catch (error) {
            console.log(error)
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updateUser(id: number, updateUserDto: UpdateUserDto, tokenPayload: PayloadTokenDto) {

        console.log("Token Payload:", tokenPayload);
        
        try{
            const user = await this.prisma.user.findFirst({
                where: { id },
            });

        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }

        if (user.id !== tokenPayload.sub) {
            throw new HttpException('Acesso Negado', HttpStatus.FORBIDDEN);
        }
        
        const dataUser:  {name?: string, email?: string, passwordhash?: string} = {
            name: updateUserDto.name? updateUserDto.name : user.name,
            email: updateUserDto.email? updateUserDto.email : user.email,
        }

        if(updateUserDto?.password){
            const passwordHash = await this.hashingService.hashPassword(updateUserDto?.password)
            dataUser['passwordhash'] = passwordHash;
        }

        const update = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: dataUser.name,
                email: dataUser.email,
                passwordhash: dataUser?.passwordhash ? dataUser?.passwordhash : user.passwordhash
            },
        });
        
        return update;

        }catch (error) {
            console.log(error);
            throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    async deleteUser(id: number, tokenPayload : PayloadTokenDto) {
        try{
            const user = await this.prisma.user.findFirst({
                where: { id },
            });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (user.id !== tokenPayload.sub) {
            throw new HttpException('Acesso Negado', HttpStatus.FORBIDDEN);
        }


        await this.prisma.user.delete({
            where: { id: user.id },
            
        });
        
        return "User deletado com sucesso !!!";

        }catch (error) {
            console.log(error);
            throw new HttpException('Usuário não encontrado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async deleteAllUsers(tokenPayload : PayloadTokenDto) {
        try{
            
        await this.prisma.user.deleteMany();
        
        return "Todos os users deletados com sucesso !!!";

        }catch (error) {
            console.log(error);
            throw new HttpException('Falha ao deletar todos os users', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
