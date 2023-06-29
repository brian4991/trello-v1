import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly configService: ConfigService,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(_id: string): Promise<Task | undefined> {
    return this.taskModel.findById(_id).exec();
  }

  async createTask(title: string, status: string): Promise<Task> {
    try {
      console.log('Received title:', title);
      console.log('Received status:', status);

      const task = new this.taskModel({ title, status });

      console.log('Task object:', task);
      const createdTask = await task.save();

      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error; // Rethrow the error to be handled in the controller or global exception filter
    }
  }

  async updateTask(id: string, title: string, status: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id);
      if (!task) {
        console.log('Received ID:', id);
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      task.title = title;
      task.status = status;

      const updatedTask = await task.save(); // Wait for the update operation to complete

      return updatedTask;
    } catch (error) {
      console.log('Received ID:', id);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async deleteTaskById(id: string): Promise<void> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
