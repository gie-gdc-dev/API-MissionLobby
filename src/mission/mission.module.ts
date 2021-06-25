import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/log/log.entity';
import { MissionController } from './mission.controller';
import { Mission } from './mission.entity';
import { MissionService } from './mission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mission]),
    TypeOrmModule.forFeature([Log]),
  ],
  providers: [MissionService],
  exports: [MissionService],
  controllers: [MissionController],
})
export class MissionModule {}
