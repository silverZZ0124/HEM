import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
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