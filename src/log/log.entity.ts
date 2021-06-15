import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Mission } from 'src/mission/mission.entity';
import { Player } from 'src/player/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn({ name: 'LogId' })
  id: number;

  @Column()
  reason: string;

  @Column('timestamp')
  date: string = dayjs().toISOString();

  @ApiProperty({ type: () => Player })
  @ManyToOne(() => Player, (p: Player) => p, { nullable: true })
  player: Player;

  @ApiHideProperty()
  @Column({ nullable: true })
  @Exclude()
  playerId: number;

  @ApiProperty({ type: () => Mission })
  @ManyToOne(() => Mission, (p: Mission) => p)
  mission: Mission;

  @ApiHideProperty()
  @Column()
  @Exclude()
  missionId: number;
}
