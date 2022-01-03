import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DateBadge from './DateBadge';
import TaskForm from './TaskForm';
import TaskContext from '../../context/task/taskContext';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { id, list_name, items } = task;

  const { deleteTaskItem, setCurrentTaskItem, clearCurrentTaskItem } =
    taskContext;

  const onDelete = (item) => {
    const deleteItem = {
      list_id: id,
      item_id: item,
    };
    deleteTaskItem(deleteItem);
    clearCurrentTaskItem({});
  };

  const onClick = (item) => {
    setCurrentTaskItem({
      list_id: id,
      task: item,
    });
  };

  return (
    <div className='item'>
      <Card text='white' className='mb-5 p-1 card' style={{ width: '18rem' }}>
        <Card.Title border='light' style={{ color: 'white' }}>
          {list_name}
        </Card.Title>
        <Droppable droppableId={list_name}>
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='droppable-col'
              >
                {items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      index={index}
                      draggableId={item.id}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card className='mt-1'>
                              <Card.Body className='p-1'>
                                <i
                                  className='far fa-edit p-1 card_icon'
                                  style={{ float: 'right' }}
                                  onClick={() => onClick(item)}
                                />{' '}
                                <span>
                                  <i
                                    className='fas fa-trash p-1 card_icon'
                                    style={{ float: 'right' }}
                                    onClick={() => onDelete(item.id)}
                                  />
                                </span>
                                {item.item_name && (
                                  <Card.Text className='m-0'>
                                    {item.item_name}
                                  </Card.Text>
                                )}
                                <DateBadge dueDate={item.due_date} />
                              </Card.Body>
                            </Card>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Card className='mt-1'>
          <Card.Body className='p-1'>
            <TaskForm listName={list_name} />
          </Card.Body>
        </Card>
      </Card>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
