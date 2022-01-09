import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ItemContents from './TaskItemContents';

const TaskItemDraggable = ({ task_id, item, index }) => {
  return (
    <Draggable key={item._id} index={index} draggableId={item._id}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ItemContents task_id={task_id} item={item} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskItemDraggable;
