// task.model.ts
import { Schema, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  status: string;
}

export const TaskSchema = new Schema<Task>({
  title: String,
  status: String,
});