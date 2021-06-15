import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { Log } from 'src/log/log.entity';
import { Team } from 'src/team/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn({ name: 'MissionId' })
  id: number;

  @Column()
  name: string;

  @Column('timestamp')
  date: string = dayjs().add(1, 'M').add(1, 'w').toISOString();

  @Column('timestamp')
  openDate: string = dayjs().toISOString();

  @Column('timestamp')
  closeDate: string = dayjs().add(1, 'M').toISOString();

  @Column('json', { nullable: true })
  briefing: unknown;

  @ApiProperty({ type: () => Team })
  @OneToMany(() => Team, (t: Team) => t.mission, { cascade: true })
  teams: Team[];

  @ApiProperty({ type: () => Log })
  @OneToMany(() => Log, (l: Log) => l.mission, { cascade: true })
  logs: Log[];
}
