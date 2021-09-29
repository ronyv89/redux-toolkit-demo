import React from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap'

export default function TodosTable({ toggleStatus, removeTodo, todos }) {
  return (
    <Table bordered responsive>
      <thead>
        <tr>
          <td>Todo</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          todos.map((todo) => (
            <tr key={`todo_${todo.id}`}>
              <td>{todo.title}</td>
              <td>
                <ButtonGroup>
                  <Button color="primary" onClick={() => toggleStatus(todo.id) }>Mark {todo.status ? ' undone' : 'done' }</Button>
                  <Button color="danger" onClick={() => removeTodo(todo.id) }>Remove todo</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}