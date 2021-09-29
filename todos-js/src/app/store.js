import { configureStore } from '@reduxjs/toolkit';
import todosCrudReducer from '../features/todosCrud/todosCrudSlice';
import todosReducer from '../features/todos/todosSlice';
import todosThunkReducer from '../features/todosThunk/todosThunkSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    todosCrud: todosCrudReducer,
    todosThunk: todosThunkReducer 
  },
});
