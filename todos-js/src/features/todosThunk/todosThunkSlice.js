import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async () => {
    const response = await axios.get("http://localhost:4000/todos");
    return response.data;
  }
)

export const addTodo = createAsyncThunk(
  'todos/create', 
  async (todo, thunkApi) => {
    const response = await axios.post("http://localhost:4000/todos", todo);
    thunkApi.dispatch(fetchTodos());
    return response.data;
  }
)


export const deleteTodo = createAsyncThunk(
  'todos/delete', 
  async (id, thunkApi) => {
    const response = await axios.delete(`http://localhost:4000/todos/${id}`);
    thunkApi.dispatch(fetchTodos());
    return response.data;
  }
)

export const updateTodo = createAsyncThunk(
  'todos/update',
  async ({ id, todo }, thunkApi) => {
    const response = await axios.patch(`http://localhost:4000/todos/${id}`, todo);
    thunkApi.dispatch(fetchTodos());
    return response.data;
  }
)
const todosThunkSlice = createSlice({
  name: 'todosThunk',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.splice(0, state.length, ...action.payload)
    })
  }
});

export default todosThunkSlice.reducer;