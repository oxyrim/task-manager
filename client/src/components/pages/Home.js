import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import TaskItem from '../tasks/TaskItem';

const Home = () => {
  const taskContext = useContext(TaskContext);
  const { tasks } = taskContext;
  return (
    <Container>
      <Row className='mt-3'>
        {tasks.map((task) => {
          return (
            <Col>
              <TaskItem task={task} />
            </Col>
          );
        })}
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Home;
