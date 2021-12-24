import React, { useState, useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';

const TaskForm = ({ listName }) => {
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
      item,
    };
    taskContext.addTask(task);
    setItem({
      item_name: '',
      due_date: '',
    });
    listName = '';
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Control
        className='mt-1'
        type='text'
        name='item_name'
        placeholder='Add task'
        value={item_name}
        onChange={onChange}
      />
      <Row>
        <Col>
          <Form.Control
            className='mt-1'
            type='date'
            name='due_date'
            value={due_date}
            onChange={onChange}
          />
        </Col>
        <Col>
          <Form.Control className='mt-1' type='submit' value='Add Task' />
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
