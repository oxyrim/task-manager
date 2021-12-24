import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DateBadge from './DateBadge';
import TaskForm from './TaskForm';

const TaskItem = ({ task }) => {
  const { list_name, items } = task;

  const onClick = () => {};
  return (
    <Card text='white' className='p-1 card' style={{ width: '18rem' }}>
      <Card.Title border='light' style={{ color: 'white' }}>
        {list_name}
      </Card.Title>
      {items.map((item) => {
        return (
          <Card className='mt-1'>
            <Card.Body className='p-1'>
              <i
                className='far fa-edit p-1 card_icon'
                style={{ float: 'right' }}
              />{' '}
              <i
                className='fas fa-trash p-1 card_icon'
                style={{ float: 'right' }}
              />
              {item.item_name && (
                <Card.Text className='m-0'>{item.item_name}</Card.Text>
              )}
              <DateBadge dueDate={item.due_date} />
            </Card.Body>
          </Card>
        );
      })}
      <Card className='mt-1'>
        <Card.Body className='p-1'>
          <TaskForm listName={list_name} />
        </Card.Body>
      </Card>
    </Card>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
