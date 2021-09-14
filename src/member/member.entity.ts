<<<<<<< HEAD
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(['memberId'])
export class Member extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    memberNo : number;

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


=======
import { Menu } from "src/menu/menu.entity";
import { Order } from "src/order/order.entity";
import { Unique, BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
@Unique(['memberId'])
export class Member extends BaseEntity {

    @PrimaryGeneratedColumn()
    memberNumber: number;

    @Column()
    memberName: string;

    @Column()
    memberAddress: string;

    @Column()
    memberPhone: string;

    @Column()
    memberId: string;

    @Column()
    memberPw: string;

    @OneToMany(() => Menu, menu => menu.member)
    menus: Menu[];

    @OneToMany(() => Order, order => order.member)
    orders: Order[];
>>>>>>> 9d93dcd9347c3ae45978f5ccb4d1346e960908ef
}