import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        list_name: 'To Do',
        item_name: 'Clean House',
        due_date: '2021-12-20',
      },
      {
        id: 2,
        list_name: 'To Do',
        item_name: 'Coding Exercise',
        due_date: '2021-12-22',
      },
      {
        id: 3,
        list_name: 'To Do',
        item_name: 'Pay Utility Bill',
        due_date: '2021-12-21',
      },
    ],
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // add task

  //Delete task

  //Set current task

  //clear current task

  // Update task

  //Filter task

  //Clear filter

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
