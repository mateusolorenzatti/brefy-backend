import { IsOptional, IsUUID } from "class-validator";

export class GetReadingsFilterDto {
    book?: string;
    author?: string;

    // UUID of target user
    @IsOptional()
    @IsUUID('all',{each:true})
    user?: string;
}