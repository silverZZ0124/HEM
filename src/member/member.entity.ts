import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(['memberId'])
export class Member extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    memberNumber : number;

    @Column()
    memberName : string;

    @Column()
    memberAddress : string;

    @Column()
    memberPhone : string;

    @Column()
    memberId : string;

    @Column()
    memberPw : string;


}