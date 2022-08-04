import { IsUUID } from "class-validator";

export class GetReadingsFilterDto {
    book?: string;
    author?: string;

    // UUID of target user
    @IsUUID('all',{each:true})
    user?: string;
}