import { Read } from 'src/read/read.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string
    
    @Column({ nullable: true })
    description: string
    
    @Column()
    pages: number
    
    @Column()
    year: number
    
    @Column({ nullable: true })
    genre: string

    @OneToMany(() => Read, read => read.book, { eager: false })
    reads: Read[]
}