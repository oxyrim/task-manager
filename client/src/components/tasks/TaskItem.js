import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddTaskForm from './AddTaskForm';
import { Droppable } from 'react-beautiful-dnd';
import TaskItemDraggable from './TaskItemDraggable';
import _ from 'lodash';

const TaskItem = ({ task }) => {
  const { _id, list_name, items, user } = task;

  return (
    <div className='item'>
      <Card text='white' className='mb-5 p-1 card' style={{ width: '18rem' }}>
        <Card.Title border='light' style={{ color: 'white' }}>
          {_.startCase(_.capitalize(list_name))}
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
                    <TaskItemDraggable
                      task_id={_id}
                      item={item}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <AddTaskForm user_id={user} listName={list_name} />
      </Card>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
