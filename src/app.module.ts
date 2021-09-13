import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {typeORMConfig} from './configs/typeorm.config'
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrderModule,
    MenuModule ,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
