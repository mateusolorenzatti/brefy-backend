import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { UserLevel } from './enums/user-level.enum';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
        return this.usersRepository.createUser(authSignUpDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        const { username, password } = authCredentialsDto
        
        const user = await this.usersRepository.findOne({ username })

        if ( user && (await bcrypt.compare(password, user.password) ) ){
            if ( user.level === UserLevel.BLOCKED ) throw new UnauthorizedException('Please check your credentials')
            
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)            

            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your credentials')
        }
    }
}
