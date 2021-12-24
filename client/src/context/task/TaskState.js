import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        list_name: 'To Do',
        items: [
          {
            id: 1,
            item_name: 'Cleaning house.',
            due_date: '2021-12-23',
          },
          {
            id: 2,
            item_name: 'Coding Project',
            due_date: '2021-12-23',
          },
          {
            id: 3,
            item_name: 'Send Money',
            due_date: '2021-12-23',
          },
        ],
      },
      {
        id: 2,
        list_name: 'Doing',
        items: [
          {
            item_name: 'Laundry',
            due_date: '2021-12-20',
          },
          {
            item_name: 'Cooking',
            due_date: '2021-12-20',
          },
          {
            item_name: 'Cleaning',
            due_date: '2021-12-20',
          },
        ],
      },
      {
        id: 3,
        list_name: 'Done',
        items: [
          {
            item_name: 'Stocking',
            due_date: '2021-12-20',
          },
          {
            item_name: 'Paid',
            due_date: '2021-12-20',
          },
          {
            item_name: 'Studying',
            due_date: '2021-12-20',
          },
        ],
      },
    ],
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Add task
  const addTask = (task) => {
    task.item.id = 5;
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  // Delete task

  // Update task

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
