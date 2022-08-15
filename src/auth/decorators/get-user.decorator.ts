import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { retryWhen } from "rxjs";
import { User } from "../entities/user.entity";

export const GetUser = createParamDecorator( 
    (_data, context: ExecutionContext): User => {
        const req = context.switchToHttp().getRequest()
        return req.user
    } 
)