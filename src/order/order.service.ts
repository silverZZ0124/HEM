import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/menu/menu.entity';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository:OrderRepository,
    ){}

    async createOrder({orderNumber,orderPrice,orderTableNumber},menus:Menu[]):Promise<Order>{
        const order = this.orderRepository.create({
            orderNumber,
            orderPrice,
            orderTableNumber,
            menus,
        })
        await this.orderRepository.save(order)
        return order;
    }

    async getOrderList(memberNumber : number):Promise<Order[]>{
        return await this.orderRepository.find({member:{
            memberNumber
        }})
    }

    async getOrder(memberNumber : number, orderNumber:number ):Promise<Order>{
        return await this.orderRepository.findOne({
            member:{
                memberNumber
            },
            orderNumber
        })
    }

    async updateOrder(currentOrder:Order , updateOrder:Order){
        const result = await this.orderRepository.update(currentOrder,updateOrder)
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Order`)
        }
    }

    async deleteOrder(memberNumber : number, orderNumber:number){
        const result = await this.orderRepository.delete({member:{memberNumber},orderNumber})
        if(result.affected === 0){
            throw new NotFoundException(`Can't find order`)
        }
    }

}
