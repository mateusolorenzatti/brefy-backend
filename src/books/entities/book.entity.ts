import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Reading } from 'src/readings/entities/reading.entity'

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

    /* ToDo: Add Field Author (Another entity)

    @Column()
    author: string

    */
    
    @Column({ nullable: true })
    genre: string

    @OneToMany(() => Reading, read => read.book, { eager: false })
    reads: Reading[]
}