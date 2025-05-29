import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async findAllUsers() {
        return this.prisma.user.findMany();
    }

    async findOneUser(id: number) {
        const user = await this.prisma.user.findFirst({
            where: { id },
            select: {
                id: true, email: true, name: true, createdAt: true
            }
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        try{
            const user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    passwordhash: createUserDto.password
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


    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        try{
            const user = await this.prisma.user.findFirst({
                where: { id },
            });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        const update = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email,
                passwordhash: updateUserDto.password
            },
        });
        
        return update;

        }catch (error) {
            console.log(error);
            throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    async deleteUser(id: number) {
        return this.prisma.user.delete({
            where: { id }
        });
    }
}
