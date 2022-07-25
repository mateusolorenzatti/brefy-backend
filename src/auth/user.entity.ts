import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Read } from "src/read/read.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string
    
    @Column()
    password: string

    @OneToMany(() => Read, read => read.user, { eager: false })
    reads: Read[]
    
}