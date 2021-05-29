import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Player } from 'src/player/player.entity';
import { Team } from 'src/team/team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ name: 'RoleId' })
  id: number;

  @Column()
  name: string;

  @Column('bool', { default: false })
  isLocked: boolean;

  @Column('text', { default: 'true' })
  openCondition: string;

  @ApiProperty({ type: () => Team })
  @ManyToOne(() => Team, (t: Team) => t)
  team: Team;

  @ApiHideProperty()
  @PrimaryColumn()
  @Exclude()
  teamId: number;

  @ApiProperty({ type: () => Player })
  @ManyToOne(() => Player, (p: Player) => p, { nullable: true })
  player: Player;

  @ApiHideProperty()
  @Column({ nullable: true })
  @Exclude()
  playerId: number;
}
