import { Column, Entity, OneToMany } from 'typeorm';

import { Task } from '../../task/entities/task.entity';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/roles';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => Task, (tasks) => tasks.user)
  tasks: Task[];
}
