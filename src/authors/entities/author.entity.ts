import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    born: Date

    @Column({ nullable: true })
    died: Date

    @Column()
    penName: string

    @Column()
    realName: string
}
