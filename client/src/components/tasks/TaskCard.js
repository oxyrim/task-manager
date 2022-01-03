import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import TaskItem from './TaskItem';
import EditModal from './EditModal';
import { DragDropContext } from 'react-beautiful-dnd';

const TaskCard = () => {
  const taskContext = useContext(TaskContext);
  const { tasks, current, deleteTaskItem, addTask } = taskContext;

  const handleDragEnd = ({ destination, source }) => {
    //if dragged outside the draggable
    if (!destination) {
      console.log('Not draggable');
      return;
    }

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
    });
    deleteTaskItem({
      list_id: findList.id,
      item_id: itemCopy.id,
    });
  };

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
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default TaskCard;
