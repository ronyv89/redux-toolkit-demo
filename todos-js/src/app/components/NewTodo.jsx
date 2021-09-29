import React from 'react';
import { Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';

export default function NewTodo({ addNewTodo, title, setTitle }) {
  return (
    <Form onSubmit={addNewTodo}> 
      <FormGroup row>
        <div className="col-md-6">
          <Row>
            <Col md={9}>
              <Input  type='text' name='title' onChange={(e) => setTitle(e.target.value)} value={title}  placeholder="Title"/>
            </Col>
            <Col md={3}>
              <Button color="primary">Add Todo</Button>
            </Col>
          </Row>
        </div>
      </FormGroup>
    </Form>
  );
}