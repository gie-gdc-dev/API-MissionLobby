import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn({ name: 'PlayerId' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ type: 'bool', default: false, insert: false })
  isAdmin = false;

  @ApiProperty({ type: () => Role })
  @OneToMany(() => Role, (r: Role) => r.player)
  roles: Role[];
}
