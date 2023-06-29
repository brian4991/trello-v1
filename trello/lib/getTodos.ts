import axios, { AxiosResponse } from 'axios';

export const getTodosGroupedByColumn = async () => {
  try {
    console.log('Fetching todos from the server...');
    const response: AxiosResponse<Todo[]> = await axios.get<Todo[]>(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
    console.log('Received todos:', response.data);

    const todos: Todo[] = response.data;

    const columns: Map<TypedColumn, Column> = todos.reduce((acc: Map<TypedColumn, Column>, todo: any) => {
      if (!acc.get(todo.status)) {
        acc.set(todo.status, {
          id: todo.status,
          todos: []
        });
      }

      const column = acc.get(todo.status);
      if (column) {
        column.todos.push({
          $id: todo._id, // Corrected property name from `$id` to `_id`
          $createdAt: todo.createdAt, // Corrected property name from `$createdAt` to `createdAt`
          title: todo.title,
          status: todo.status as TypedColumn
        });
      }

      return acc;
    }, new Map<TypedColumn, Column>());

    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

    for (const columnType of columnTypes) {
      if (!columns.get(columnType)) {
        columns.set(columnType, {
          id: columnType,
          todos: []
        });
      }
    }

    const sortedColumns: Map<TypedColumn, Column> = new Map(
      Array.from(columns.entries()).sort((a, b) => (
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
      ))
    );

    const board = {
      columns: sortedColumns
    };

    console.log('Board:', board);

    return board;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
