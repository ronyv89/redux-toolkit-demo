import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewTodo from '../../app/components/NewTodo';
import { addTodo, updateTodo, deleteTodo, todosSelectors } from './todosCrudSlice';
import TodosTable from '../../app/components/TodosTable';
import { store } from '../../app/store';

export default function TodosCrud() {
  const todos = useSelector(todosSelectors.selectAll)
  
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');

  const addNewTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo({
      id: nanoid(),
      title,
      status: false
    }));
    setTitle('');
  }
  const toggleStatus = (id) => {
    const todo = todosSelectors.selectById(store.getState(), id)
    dispatch(updateTodo({
      id,
      changes: {
        status: !todo.status
      }
    }));
  }
  return (
    <div>
      <h1>CRUD Todos</h1>
      <TodosTable todos={todos} toggleStatus={toggleStatus} removeTodo={(id) => dispatch(deleteTodo(id))} />
      <NewTodo addNewTodo={addNewTodo} title={title} setTitle={setTitle} />
    </div>
  );
}