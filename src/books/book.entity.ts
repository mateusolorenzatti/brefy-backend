import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

}