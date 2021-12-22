import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DateBadge from './DateBadge';

const TaskItem = ({ task }) => {
  const { list_name, items } = task;
  return (
    <Card
      className='p-1'
      bg='success'
      border='success'
      style={{ width: '18rem' }}
    >
      <Card.Title border='light' style={{ color: 'white' }}>
        {list_name}
      </Card.Title>
      {items.map((item) => {
        return (
          <Card.Body className='p-1 '>
            <Card className='card'>
              <Card.Body className='p-0'>
                <div className='p-1'>
                  <i
                    className='far fa-edit p-1'
                    style={{ float: 'right', color: 'grey' }}
                  />{' '}
                  <i
                    className='fas fa-trash p-1'
                    style={{ float: 'right', color: 'grey' }}
                  />
                  {item.item_name && (
                    <Card.Text className='m-0'>{item.item_name}</Card.Text>
                  )}
                  <DateBadge dueDate={item.due_date} />
                </div>
              </Card.Body>
            </Card>
          </Card.Body>
        );
      })}
    </Card>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
