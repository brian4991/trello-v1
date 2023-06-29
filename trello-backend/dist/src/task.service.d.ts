import { Model } from 'mongoose';
import { Task } from './task.model';
import { ConfigService } from '@nestjs/config';
export declare class TaskService {
    private readonly taskModel;
    private readonly configService;
    constructor(taskModel: Model<Task>, configService: ConfigService);
    getAllTasks(): Promise<Task[]>;
    getTaskById(_id: string): Promise<Task | undefined>;
    createTask(title: string, status: string): Promise<Task>;
    updateTask(id: string, title: string, status: string): Promise<Task>;
    deleteTaskById(id: string): Promise<void>;
}
