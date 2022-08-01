import { IsEnum, Matches } from "class-validator"
import { ReadingStatus } from "../reading-status.enum"

export class CreateReadingDto {
    start: Date
    end?: Date

    @IsEnum(
        ReadingStatus, 
        { 
            each: true, 
            message: 'Invalid Status value. Expecting: ' + Object.values(ReadingStatus).filter(v => typeof v !== "number").join('|') 
        }
    )
    status: ReadingStatus
    
    book: string
    public: boolean
}