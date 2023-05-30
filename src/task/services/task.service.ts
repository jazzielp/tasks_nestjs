import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { Task } from '../entities/task.entity';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TaskService {
  @InjectRepository(Task) private readonly taskRepository: Repository<Task>;

  //Creation
  async create(body: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Find all
  async findAll(): Promise<Task[]> {
    try {
      const tasks: Task[] = await this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .select([
          'task.id',
          'task.name',
          'task.description',
          'task.status',
          'task.createdAt',
          'task.updatedAt',
          'user.firstName',
          'user.lastName',
          'user.role',
          'user.createdAt',
          'user.updatedAt',
        ])
        .getMany();
      if (tasks.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No results found',
        });
      }
      return tasks;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Find One
  async findOne(id: number): Promise<Task> {
    try {
      const task: Task = await this.taskRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where({ id })
        .select([
          'task.id',
          'task.name',
          'task.description',
          'task.status',
          'task.createdAt',
          'task.updatedAt',
          'user.firstName',
          'user.lastName',
          'user.role',
          'user.createdAt',
          'user.updatedAt',
        ])
        .getOne();
      if (!task) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Record not found',
        });
      }

      return task;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Update
  //....................
  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    try {
      const task: UpdateResult = await this.taskRepository.update(
        id,
        updateTaskDto,
      );
      if (task.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return task;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // Delete
  // ..........................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const task: DeleteResult = await this.taskRepository.delete(id);
      if (task.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return task;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
