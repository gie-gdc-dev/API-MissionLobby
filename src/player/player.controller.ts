import {
  Controller,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Crud({
  model: {
    type: Player,
  },
  params: {
    id: {
      primary: true,
      disabled: true,
    },
  },
  query: {
    exclude: ['password'],
    join: {
      roles: {
        eager: true,
      },
      'roles.team': {
        eager: true,
        required: false,
      },
      'roles.team?.mission': {
        eager: true,
        required: false,
        exclude: ['briefing'],
      },
    },
  },
  routes: {
    only: ['getOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => ({
    id: user.userId,
  }),
})
@ApiTags('players')
@Controller('me')
export class PlayerController {
  constructor(public service: PlayerService) {}

  get base(): CrudController<Player> {
    return this;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @Request() { user }: any,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Player,
  ) {
    if (
      user.isAdmin ||
      !['isAdmin'].some((el) => Object.keys(dto).includes(el))
    ) {
      return await this.base.updateOneBase(req, dto);
    }
    throw new UnauthorizedException();
  }
}
