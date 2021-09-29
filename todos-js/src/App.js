import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Todos from './features/todos/Todos';
import { Container } from 'reactstrap';
import TodosCrud from './features/todosCrud/TodosCrud';
import TodosThunk from './features/todosThunk/TodosThunk';

function App() {
  return (
    <Container>
      <Todos />
      <br />
      <TodosCrud />
      <br />
      <TodosThunk /> 
    </Container>
  );
}

export default App;
