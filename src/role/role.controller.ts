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
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Crud({
  model: {
    type: Role,
  },
  params: {
    teamId: {
      field: 'teamId',
      type: 'number',
    },
    missionId: {
      field: 'team.missionId',
      type: 'number',
    },
  },
  query: {
    join: {
      team: {
        eager: true,
      },
      'team.mission': {
        eager: true,
        exclude: ['context', 'briefing', 'intel', 'equipment', 'credits'],
      },
      player: {
        eager: true,
        required: false,
        exclude: ['isAdmin', 'password'],
      },
    },
  },
})
@ApiTags('roles')
@Controller('missions/:missionId/teams/:teamId/roles')
export class RoleController {
  constructor(public service: RoleService) {}

  get base(): CrudController<Role> {
    return this;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() roleDTO: Role,
  ) {
    const role = await this.base.getOneBase(req);
    if (
      user.isAdmin ||
      ((role.player === null || role.playerId === user.userId) &&
        !role.isLocked &&
        !['openCondition', 'isLocked', 'teamId', 'name'].some((el) =>
          Object.keys(roleDTO).includes(el),
        ))
    ) {
      return await this.base.updateOneBase(req, roleDTO);
    }
    throw new UnauthorizedException();
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  replaceOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() role: Role,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.replaceOneBase(req, role);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  createOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() role: Role,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.createOneBase(req, role);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  createMany(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() role: CreateManyDto<Role>,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException();
    }
    return this.base.createManyBase(req, role);
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
