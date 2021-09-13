import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Menu extends BaseEntity{
    @PrimaryGeneratedColumn()
    menu_number:number;

    @Column()
    menu_name:string;

    @Column()
    menu_price:number;
    
    @Column()
    menu_status:string;

}