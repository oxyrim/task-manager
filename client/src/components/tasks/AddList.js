import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';

const AddList = () => {
  const taskContext = useContext(TaskContext);
  const [list, setList] = useState('');

  const onChange = (event) => {
    setList(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // @todo sent to addTask taskContext
    taskContext.addTask({ list_name: list });
    setList('');
  };

  return (
    <Card>
      <Card.Body className='p-1'>
        <Form onSubmit={onSubmit}>
          <Form.Control
            className='mt-1'
            type='text'
            name='item_name'
            placeholder='Add list'
            onChange={onChange}
          />
          <Button className='mt-1 col-12 button' type='submit' value='Add'>
            Add
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddList;
