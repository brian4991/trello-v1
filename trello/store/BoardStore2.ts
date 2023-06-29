// Importing dependencies and custom hooks
import axios from 'axios';
import { getTodosGroupedByColumn } from '@/lib/getTodos';
import { create } from 'zustand';

// Define the interface for the BoardState
interface BoardState {
  setBoardState: any;
  board: Board;
  getBoard: () => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  newTaskInput: string;
  setNewTaskInput: (input: string) => void;

  newTaskType: TypedColumn;
  setNewTaskType: (columnID: TypedColumn) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTask: (todo: string, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  // Initial state for the board
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  // Initial state for search string, new task input, and new task type
  searchString: "",
  newTaskInput: "",
  newTaskType: "todo",

  // Function to set the search string
  setSearchString: (searchString) => set({ searchString }),

  // Function to fetch the board data
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    console.log('Fetched board:', board);
    set({ board });
  },

  // Function to update the board state
  setBoardState: (board: any) => set({ board }),

  // Function to delete a task
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${todo.$id}`);
  },

  // Function to add a new task
  addTask: async (todo: string, columnId: TypedColumn) => {
    const { $id } : any =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      title: todo,
      status: columnId
    });

    set({ newTaskInput: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo]
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns
        }
      };
    });
  },

  // Function to set the new task input
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  // Function to set the new task type
  setNewTaskType: (columnID: TypedColumn) => set({ newTaskType: columnID }),

  updateTodoInDB: async (todo, columnId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${todo.$id}`, {
        title: todo.title,
        status: columnId
      });
      console.log('Updated todo:', response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }
}));
