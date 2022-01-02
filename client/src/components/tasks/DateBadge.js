import React from 'react';
import { Badge } from 'react-bootstrap';

const DateBadge = ({ dueDate }) => {
  const now = new Date();
  const date = new Date(dueDate);
  const dateDifference = (date - now) / (60 * 60 * 24 * 1000);
  date.toString('YYYY-MM-dd');
  const formateDate = date.toString().split(' ');

  return (
    <Badge className={dateDifference < 2 ? 'badge_due_date' : 'badge_normal'}>
      <i className='far fa-clock' /> {formateDate[1] + ' ' + formateDate[2]}
    </Badge>
  );
};

export default DateBadge;
