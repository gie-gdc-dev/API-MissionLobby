import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
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
    exclude: ['password', 'isAdmin'],
  },
  routes: {
    only: ['getManyBase'],
  },
})
@ApiTags('players')
@Controller('players')
export class PlayerListController {
  constructor(public service: PlayerService) {}
}
