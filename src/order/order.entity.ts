import { Member } from "src/member/member.entity";
import { Menu } from "src/menu/menu.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    orderId:number;

    @Column()
    orderTableNumber:string;

    @Column()
    orderPrice:number;

    @ManyToOne(() => Member, member => member.orders)
    member: Member;

    @ManyToMany(() => Menu)
    @JoinTable()
    Menus: Menu[];
}