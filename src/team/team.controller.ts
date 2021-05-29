import {
  Controller,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateManyDto,
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Crud({
  model: {
    type: Team,
  },
  params: {
    missionId: {
      field: 'missionId',
      type: 'number',
    },
  },
  query: {
    join: {
      mission: {
        eager: true,
      },
      roles: {
        eager: true,
      },
      'roles.player': {
        eager: true,
        required: false,
        exclude: ['isAdmin', 'password'],
      },
    },
  },
})
@ApiTags('teams')
@Controller('missions/:missionId/teams')
export class TeamController {
  constructor(public service: TeamService) {}

  get base(): CrudController<Team> {
    return this;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  updateOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Team,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  replaceOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Team,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.replaceOneBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  createOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Team,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.createOneBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  createMany(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<Team>,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.createManyBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  deleteOne(@Request() { user }: any, @ParsedRequest() req: CrudRequest) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.deleteOneBase(req);
  }
}
