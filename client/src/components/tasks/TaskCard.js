import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import TaskItem from './TaskItem';
import EditModal from './EditModal';
import { DragDropContext } from 'react-beautiful-dnd';
import AddList from './AddList';
import Spinner from '../layouts/Spinner';

const TaskCard = () => {
  const taskContext = useContext(TaskContext);
  const { tasks, current, deleteTaskItem, addTask, getTask, loading } =
    taskContext;

  useEffect(() => {
    getTask();
  }, []);

  const handleDragEnd = ({ destination, source }) => {
    console.log('destination', destination);
    console.log('source', source);
    //If dragged outside the draggable
    if (!destination) {
      console.log('Not draggable');
      return;
    }

    //Not changing the position or index in the same card
    if (destination.droppableId === source.droppableId) {
      console.log('dragged to same place');
      return;
    }

    //if dragged to some place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log('dragged to same place');
      return;
    }

    //create a copy of the source item
    const findList = tasks.find(
      (task) => task.list_name === source.droppableId
    );

    const itemCopy = findList.items[source.index];
    addTask({
      list_name: destination.droppableId,
      index: destination.index,
      item: itemCopy,
      user_id: findList.user,
    });
    deleteTaskItem({
      list_id: findList._id,
      item_id: itemCopy._id,
    });
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      {current !== null && <EditModal />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className='mt-3 mb-5 mx-0'>
          {tasks.map((task) => {
            return (
              <Col key={task.list_name}>
                <TaskItem task={task} />
              </Col>
            );
          })}
          <Col>
            <AddList />
          </Col>
          {/* </HorizontalScroll> */}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default TaskCard;
