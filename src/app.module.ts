import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MissionModule } from './mission/mission.module';
import OrmConfig from './ormconfig';
import { PlayerModule } from './player/player.module';
import { RoleModule } from './role/role.module';
import { TeamModule } from './team/team.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    PlayerModule,
    MissionModule,
    RoleModule,
    AuthModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
