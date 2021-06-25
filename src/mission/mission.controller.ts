import {
  Controller,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Log } from 'src/log/log.entity';
import { Repository } from 'typeorm';
import { Mission } from './mission.entity';
import { MissionService } from './mission.service';

@Crud({
  model: {
    type: Mission,
  },
  query: {
    join: {
      teams: {
        eager: true,
      },
      'teams.roles': {
        eager: true,
        required: false,
        alias: 'teamsRoles',
      },
      'teams.roles.player': {
        eager: true,
        required: false,
        exclude: ['isAdmin', 'password'],
        alias: 'teamsRolesPlayer',
      },
    },
  },
  routes: {
    exclude: ['createManyBase'],
  },
})
@ApiTags('missions')
@Controller('missions')
export class MissionController {
  constructor(
    public service: MissionService,
    @InjectRepository(Log) private logRepository: Repository<Log>,
  ) {}

  get base(): CrudController<Mission> {
    return this;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  updateOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Mission,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    const log = this.logRepository.create({
      reason: `updated`,
      playerId: user.id,
      missionId: dto.id,
    });
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  replaceOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Mission,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    this.logRepository.create({
      reason: `replaced`,
      playerId: user.id,
      missionId: dto.id,
    });
    return this.base.replaceOneBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  async createOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Mission,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    const mission = await this.base.createOneBase(req, dto);
    this.logRepository.create({
      reason: `created`,
      playerId: user.id,
      missionId: mission.id,
    });
    return mission;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  deleteOne(@Request() { user }: any, @ParsedRequest() req: CrudRequest) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    this.logRepository.create({
      reason: `deleted`,
      playerId: user.id,
    });
    return this.base.deleteOneBase(req);
  }
}
