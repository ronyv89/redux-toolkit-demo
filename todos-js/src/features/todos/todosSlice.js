import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload)
      state.splice(index, 1);
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload;
      const index = state.findIndex(todo => todo.id === id)
      state[index] = todo;
    }
  }
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;