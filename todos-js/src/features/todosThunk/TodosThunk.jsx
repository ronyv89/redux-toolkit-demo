import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewTodo from '../../app/components/NewTodo';
import { addTodo, updateTodo, deleteTodo, fetchTodos } from './todosThunkSlice';
import TodosTable from '../../app/components/TodosTable';

export default function TodosThunk() {
  const todos = useSelector(state => state.todosThunk)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');

  const addNewTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo({
      title,
      status: 0
    }));
    setTitle('');
  }
  const toggleStatus = (id) => {
    const todo = todos.find(todo => todo.id === id)
    dispatch(updateTodo({
      id,
      todo: {
        ...todo,
        status: todo.status ? 0 : 1
      }
    }));
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])


  return (
    <div>
      <h1>Thunk Todos</h1>
      <TodosTable todos={todos} toggleStatus={toggleStatus} removeTodo={(id) => dispatch(deleteTodo(id))} />
      <NewTodo addNewTodo={addNewTodo} title={title} setTitle={setTitle} />
    </div>
  );
}