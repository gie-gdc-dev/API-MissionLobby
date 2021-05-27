import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';
import { Team } from 'src/team/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn({ name: 'MissionId' })
  id: number;

  @Column()
  name: string;

  @Column({ default: dayjs().toISOString() })
  date: string;

  @Column({ default: dayjs().subtract(1, 'M').toISOString() })
  openDate: string;

  @Column({ default: dayjs().subtract(1, 'w').toISOString() })
  closeDate: string;

  @ApiProperty({ type: () => Team })
  @OneToMany(() => Team, (t: Team) => t.mission, { cascade: true })
  teams: Team[];
}
