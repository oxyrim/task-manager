import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import TaskItem from './TaskItem';

const TaskCard = () => {
  const taskContext = useContext(TaskContext);
  const { tasks } = taskContext;

  return (
    <Container>
      <Row className='mt-3 mx-0'>
        {tasks.map((task) => {
          return (
            <Col>
              <TaskItem task={task} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default TaskCard;
