import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn()
    orderId:number;

    @Column()
    orderTableNumber:string;

    @Column()
    price:number;

}