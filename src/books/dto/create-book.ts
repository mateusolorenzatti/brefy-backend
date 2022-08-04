import { IsNumber } from "class-validator";

export class CreateBookDto {
    title: string
    description?: string
    
    @IsNumber()
    pages: number

    @IsNumber()
    year: number

    genre?: string
}