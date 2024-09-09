import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notify } from "../../utils/notify";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ token, filterCompleted }) => {
    let url = "http://localhost:5000/api/tasks";
    if (filterCompleted !== "") {
      url += `?completed=${filterCompleted}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    return data.obj;
  }
);

// Async thunk para agregar una tarea
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ token, taskData }) => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    notify(data.msg);
    console.log("Nueva tarea creada:", data.obj)
    return data.obj; 
  }
);

// Async thunk para editar una tarea
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ token, taskId, taskData }) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    notify(data.msg);
    return data.obj;
  }
);

// Async thunk para eliminar una tarea
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ token, taskId }) => {
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    return taskId;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // Add task
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    // Edit task
    builder.addCase(editTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });

    // Delete task
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
  },
});

export default tasksSlice.reducer;
