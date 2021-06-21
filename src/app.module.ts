import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './log/log.module';
import { Mission } from './mission/mission.entity';
import { MissionModule } from './mission/mission.module';
import OrmConfig from './ormconfig';
import { PlayerModule } from './player/player.module';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { Team } from './team/team.entity';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    TypeOrmModule.forFeature([Mission]),
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([Role]),
    PlayerModule,
    MissionModule,
    RoleModule,
    AuthModule,
    TeamModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
