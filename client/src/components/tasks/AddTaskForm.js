import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import { Card } from 'react-bootstrap';

const TaskForm = ({ listName, user_id }) => {
  const taskContext = useContext(TaskContext);

  const [item, setItem] = useState({
    item_name: '',
    due_date: '',
  });

  const list_name = listName;
  const { item_name, due_date } = item;

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItem({ ...item, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const task = {
      list_name,
      user_id,
      item,
      index: null,
    };
    taskContext.addTask(task);
    setItem({
      item_name: '',
      due_date: '',
    });
    listName = '';
  };

  return (
    <Card className='mt-1'>
      <Card.Body className='p-1'>
        <Form onSubmit={onSubmit}>
          <Form.Control
            className='mt-1'
            type='text'
            name='item_name'
            placeholder='Add task'
            value={item_name}
            onChange={onChange}
          />

          <Form.Control
            className='mt-1'
            type='date'
            name='due_date'
            value={due_date}
            onChange={onChange}
          />

          <Form.Control className='mt-1' type='submit' value='Add Task' />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;
