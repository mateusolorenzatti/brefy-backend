import { IsBoolean, IsDateString, IsEnum, IsOptional, IsUUID } from "class-validator"
import { ReadingStatus } from "../reading-status.enum"

export class CreateReadingDto {
    @IsDateString()
    start: Date

    @IsOptional()
    @IsDateString()
    end?: Date

    @IsEnum(
        ReadingStatus, 
        { 
            each: true, 
            message: 'Invalid Status value. Expecting: ' + Object.values(ReadingStatus).filter(v => typeof v !== "number").join('|') 
        }
    )
    status: ReadingStatus
    
    @IsUUID('all',{each:true})
    book: string

    @IsBoolean()
    public: boolean
}
