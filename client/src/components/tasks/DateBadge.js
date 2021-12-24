import React from 'react';
import { Badge } from 'react-bootstrap';

const DateBadge = ({ dueDate }) => {
  const date = new Date(dueDate);
  date.toString('YYYY-MM-dd');
  const formateDate = date.toString().split(' ');

  return (
    <Badge style={{ backgroundColor: 'red !important' }}>
      <i className='far fa-clock' /> {formateDate[1] + ' ' + formateDate[2]}
    </Badge>
  );
};

export default DateBadge;
