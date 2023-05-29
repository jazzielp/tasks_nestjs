import { Task } from 'src/task/entities/task.entity';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/roles';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @Column()
  role: ROLES;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
