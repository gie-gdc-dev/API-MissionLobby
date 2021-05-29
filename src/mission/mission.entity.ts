import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { Team } from 'src/team/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn({ name: 'MissionId' })
  id: number;

  @Column()
  name: string;

  @Column()
  date: string = dayjs().add(1, 'M').toISOString();

  @Column()
  openDate: string = dayjs().add(1, 'M').toISOString();

  @Column()
  closeDate: string = dayjs().add(1, 'M').toISOString();

  @ApiProperty({ type: () => Team })
  @OneToMany(() => Team, (t: Team) => t.mission, { cascade: true })
  teams: Team[];
}
