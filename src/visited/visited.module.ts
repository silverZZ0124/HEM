import { Module } from '@nestjs/common';
import { VisitedService } from './visited.service';
import { VisitedController } from './visited.controller';

@Module({
  providers: [VisitedService],
  controllers: [VisitedController]
})
export class VisitedModule {}
