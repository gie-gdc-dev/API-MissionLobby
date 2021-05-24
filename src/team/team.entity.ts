import { ApiProperty } from '@nestjs/swagger';
import { Mission } from 'src/mission/mission.entity';
import { Role } from 'src/role/role.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn({ name: 'TeamId' })
  id: number;

  @Column({ unique: true })
  name: string;

  @ApiProperty({type: () => Mission})
  @ManyToOne(() => Mission, (m) => m)
  mission: Mission;

  @ApiProperty({ type: () => Role })
  @OneToMany(() => Role, (r) => r.team)
  players: Role[];
}
