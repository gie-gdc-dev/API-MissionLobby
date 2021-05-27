import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Mission } from 'src/mission/mission.entity';
import { Role } from 'src/role/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn({ name: 'TeamId' })
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiProperty({ type: () => Mission })
  @ManyToOne(() => Mission, (m: Mission) => m)
  mission: Mission;

  @ApiHideProperty()
  @Column({ update: false })
  @Exclude()
  missionId: number;

  @ApiProperty({ type: () => Role })
  @OneToMany(() => Role, (r: Role) => r.team)
  roles: Role[];
}
