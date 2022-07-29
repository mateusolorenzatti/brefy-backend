import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from 'src/auth/user.entity'
import { Book } from 'src/books/book.entity'
import { ReadingStatus } from './reading-status.enum'

@Entity()
export class Reading {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    start: Date
    
    @Column({ nullable: true })
    end: Date

    @Column()
    status: ReadingStatus

    @Column()
    public: boolean
    
    @ManyToOne((_type) => Book, book => book.reads, { eager: true } )
    book: Book
    
    @ManyToOne((_type) => User, user => user.reads, { eager: false } )
    user: User

}