import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {

    constructor(
        @InjectRepository(MenuRepository)
        private menuRepository:MenuRepository,
    ){}

    async createMenu({menuName,menuPrice,member}):Promise<Menu>{
        const menu = this.menuRepository.create({
            menuName,
            menuPrice,
            member
        })

        await this.menuRepository.save(menu)
        return menu;
    }

    async getMenuList(memberNumber : number):Promise<Menu[]>{
        return await this.menuRepository.find({member:{
            memberNumber
        }})
    }

    async getMenu(memberNumber : number, menuNumber:number ):Promise<Menu>{
        return await this.menuRepository.findOne({
            member:{
                memberNumber
            },
            menuNumber
        })
    }

    async updateMenu(currentMenu:Menu , updateMenu:Menu){
        const result = await this.menuRepository.update(currentMenu,updateMenu)
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Menu`)
        }
    }

    async deleteMenu(memberNumber : number, menuNumber:number){
        const result = await this.menuRepository.delete({member:{memberNumber},menuNumber})
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Menu`)
        }
    }


}
