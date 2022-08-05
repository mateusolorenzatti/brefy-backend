import { IsBoolean, IsDateString, IsEnum, IsOptional, IsUUID } from "class-validator"
import { ReadingStatus } from "../reading-status.enum"

export class UpdateReadingDto {
    @IsOptional()
    @IsDateString()
    start: Date

    @IsOptional()
    @IsDateString()
    end?: Date

    @IsOptional()
    @IsEnum(
        ReadingStatus, 
        { 
            each: true, 
            message: 'Invalid Status value. Expecting: ' + Object.values(ReadingStatus).filter(v => typeof v !== "number").join('|') 
        }
    )
    status: ReadingStatus

    @IsOptional()
    @IsBoolean()
    public: boolean
}
