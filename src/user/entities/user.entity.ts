import { Column, Entity, OneToMany } from 'typeorm';

import { Task } from '../../task/entities/task.entity';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/roles';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  fistName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
