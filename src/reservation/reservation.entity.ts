import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Reservation extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    reservationNumber : number;

    @Column()
    reservationName : string;

    @Column()
    reservationPhone : string;

    @Column()
    reservationDate: Date;

    @Column()
    reservationTime : Date;

    @Column()
    reservationPeople : number;


}