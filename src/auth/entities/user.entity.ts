import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
;
import { UserLevel } from "../enums/user-level.enum";
import { Reading } from "src/readings/entities/reading.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string
    
    @Column()
    password: string

    @Column()
    level: UserLevel

    @OneToMany(() => Reading, read => read.user, { eager: false })
    reads: Reading[]
    
}