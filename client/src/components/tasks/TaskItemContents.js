import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import TaskContext from '../../context/task/taskContext';
import DateBadge from './DateBadge';

const ItemContents = ({ task_id, item }) => {
  const taskContext = useContext(TaskContext);

  const { deleteTaskItem, setCurrentTaskItem, clearCurrentTaskItem } =
    taskContext;

  const onDelete = (item_id) => {
    const deleteItem = {
      list_id: task_id,
      item_id,
    };
    deleteTaskItem(deleteItem);
    clearCurrentTaskItem({});
  };

  const onClick = (item) => {
    setCurrentTaskItem({
      list_id: task_id,
      task: item,
    });
  };
  return (
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
            onClick={() => onDelete(item._id)}
          />
        </span>
        {item.item_name && (
          <Card.Text className='m-0'>{item.item_name}</Card.Text>
        )}
        <DateBadge dueDate={item.due_date} />
      </Card.Body>
    </Card>
  );
};

export default ItemContents;
