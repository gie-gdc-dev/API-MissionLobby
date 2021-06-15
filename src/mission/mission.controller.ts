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
})
@ApiTags('missions')
@Controller('missions')
export class MissionController {
  constructor(public service: MissionService) {}

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
    return this.base.replaceOneBase(req, dto);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  createOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Mission,
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
    @ParsedBody() dto: CreateManyDto<Mission>,
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
