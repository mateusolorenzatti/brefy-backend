import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){}

    async getUserById(id: string): Promise<User> {
        let found = new User()
        let notFoundMessage = `User with ID ${id} not found`

        try{
            found = await this.usersRepository.findOne(id)
        }catch(QueryFailedError){
            throw new NotFoundException(notFoundMessage)
        } 

        if (!found)
            throw new NotFoundException(notFoundMessage)

        return found
    }

}