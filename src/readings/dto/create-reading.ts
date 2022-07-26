import { ReadingStatus } from "../reading-status.enum"

export class CreateReadingDto {
    start: Date
    end?: Date
    status: ReadingStatus
    book: string
}