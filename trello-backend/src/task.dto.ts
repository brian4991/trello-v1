
export class CreateTaskDto {
  title: string;
  status: string;
}


export class UpdateTaskDto {
  title?: string;
  status?: string;
}