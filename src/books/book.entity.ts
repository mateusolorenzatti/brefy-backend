import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Reading } from 'src/readings/reading.entity'

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

    @OneToMany(() => Reading, read => read.book, { eager: false })
    reads: Reading[]
}