import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import TaskItem from './TaskItem';
import EditModal from './EditModal';

const TaskCard = () => {
  const taskContext = useContext(TaskContext);
  const { tasks, current } = taskContext;

  return (
    <Container>
      {current !== null && <EditModal />}
      <Row className='mt-3 mb-5 mx-0'>
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
