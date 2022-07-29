import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { UserLevel } from "./user-level.enum";
import { AuthSignUpDto } from "./dto/auth-sign-up.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{    

    async createUser(authSignUpDto: AuthSignUpDto): Promise<void>{
        const { username, password, email } = authSignUpDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({ 
            username, 
            email,
            password: hashedPassword, 
            level: UserLevel.NORMAL
        })

        try{
            await this.save(user)
        }catch(error){
            if (error.code === '23505') { // Duplicate username
                throw new ConflictException('Username and/or Email already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}