import { IsString, Matches, MaxLength, MinLength } from "class-validator"
import { AuthCredentialsDto } from "./auth-credentials.dto";

export class AuthSignUpDto extends AuthCredentialsDto {
    @IsString()
    @MinLength(5)
    @Matches(
        /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
        { message: 'Invalid email address' }
    )
    email: string;
}