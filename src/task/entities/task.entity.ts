import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  status: boolean;
}
