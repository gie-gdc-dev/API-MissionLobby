import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Log } from './log.entity';

@Crud({
  model: {
    type: Log,
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
        exclude: ['context', 'briefing', 'intel', 'equipment', 'credits'],
      },
      player: {
        eager: true,
        required: false,
        exclude: ['isAdmin', 'password'],
      },
    },
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@ApiTags('log')
@Controller('log/:missionId')
export class LogController {}
