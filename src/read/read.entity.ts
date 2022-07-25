import { User } from 'src/auth/user.entity'
import { Book } from 'src/books/book.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Read {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    start: Date
    
    @Column({ nullable: true })
    end: Date
    
    @ManyToOne((_type) => Book, book => book.reads, { eager: true } )
    book: Book
    
    @ManyToOne((_type) => User, user => user.reads, { eager: true } )
    user: User

}