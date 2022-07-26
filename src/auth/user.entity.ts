import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Read } from "src/read/read.entity";
import { UserLevel } from "./user-level.enum";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string
    
    @Column()
    password: string

    @Column()
    level: UserLevel

    @OneToMany(() => Read, read => read.user, { eager: false })
    reads: Read[]
    
}