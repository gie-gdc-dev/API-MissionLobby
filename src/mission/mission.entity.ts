import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/role/role.entity';
import { Team } from 'src/team/team.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn({ name: 'MissionId' })
  id: number;

  @Column()
  name: string;

  @Column({ default: new Date().toISOString() })
  date: string;

  @ApiProperty({ type: () => Role })
  @OneToMany(() => Role, (r) => r.mission, { cascade: true })
  roles: Role[];

  @ApiProperty({type: () => Team})
  @OneToMany(() => Team, (t) => t.mission, {cascade: true})
}
