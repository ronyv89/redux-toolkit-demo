import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewTodo from '../../app/components/NewTodo';
import { addTodo, updateTodo, deleteTodo } from './todosSlice';
import TodosTable from '../../app/components/TodosTable';

export default function Todos() {
  const todos = useSelector(state => state.todos)
  
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');

  const addNewTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo({
      id: nanoid(),
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
        status: !todo.status
      }
    }));
  }
  return (
    <div>
      <h1>Todos</h1>
      <TodosTable todos={todos} toggleStatus={toggleStatus} removeTodo={(id) => dispatch(deleteTodo(id))} />
      <NewTodo addNewTodo={addNewTodo} title={title} setTitle={setTitle} />
    </div>
  );
}