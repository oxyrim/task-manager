import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Modal, Row, Col, Form } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';

const EditModal = () => {
  const taskContext = useContext(TaskContext);

  const [item, setItem] = useState({
    item_name: '',
    due_date: '',
  });

  const { current, clearCurrentTaskItem, updateTask } = taskContext;
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (current !== null) {
      setItem(current.task);
    } else {
      setItem({
        item_name: '',
        due_date: '',
      });
    }
  }, [taskContext, current]);

  const { item_name, due_date } = item;

  const handleClose = () => {
    setShow(false);
    clearCurrentTaskItem();
  };

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItem({ ...item, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updateItem = {
      list_id: current.list_id,
      task: item,
    };
    updateTask(updateItem);
    clearCurrentTaskItem();
  };
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Control
              className='mt-1'
              type='text'
              name='item_name'
              placeholder='Add task'
              value={item_name}
              onChange={onChange}
              style={{ backgroundColor: '#F4F5F7' }}
            />
            <Row>
              <Col>
                <Form.Control
                  className='mt-1'
                  type='date'
                  name='due_date'
                  value={due_date}
                  onChange={onChange}
                  style={{ backgroundColor: '#F4F5F7' }}
                />
              </Col>
              <Col>
                <Form.Control
                  className='mt-1'
                  type='submit'
                  value='Add Task'
                  style={{ backgroundColor: '#d369229d', color: 'white' }}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default EditModal;
