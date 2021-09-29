import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter({})

const todosCrudSlice = createSlice({
  name: 'crudTodos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    deleteTodo: todosAdapter.removeOne,
    updateTodo: todosAdapter.updateOne,
  }
});

export const todosSelectors = todosAdapter.getSelectors(state => state.todosCrud)
export const { addTodo, deleteTodo, updateTodo } = todosCrudSlice.actions;
export default todosCrudSlice.reducer;
