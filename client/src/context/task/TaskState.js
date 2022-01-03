import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { v4 } from 'uuid';

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        list_name: 'To Do',
        items: [
          {
            id: '1',
            item_name: 'Cleaning house.',
            due_date: '2021-12-23',
          },
          {
            id: '2',
            item_name: 'Coding Project',
            due_date: '2021-12-23',
          },
          {
            id: '3',
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
            id: '4',
            item_name: 'Laundry',
            due_date: '2021-12-20',
          },
          {
            id: '5',
            item_name: 'Cooking',
            due_date: '2021-12-20',
          },
          {
            id: '6',
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
            id: '7',
            item_name: 'Stocking',
            due_date: '2021-12-20',
          },
          {
            id: '8',
            item_name: 'Paid',
            due_date: '2021-12-20',
          },
          {
            id: '9',
            item_name: 'Studying',
            due_date: '2021-12-20',
          },
        ],
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Add task
  const addTask = (task) => {
    task.item.id = v4();
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  // Update Task
  const updateTask = (item) => {
    dispatch({ type: 'UPDATE_TASK', payload: item });
  };

  // Delete task
  const deleteTaskItem = (deleteItem) => {
    dispatch({ type: 'DELETE_TASK', payload: deleteItem });
  };

  //Set Current Task Item
  const setCurrentTaskItem = (item) => {
    dispatch({ type: 'SET_CURRENT', payload: { item } });
  };

  // Clear Current Task Item
  const clearCurrentTaskItem = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Update task

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        addTask,
        updateTask,
        deleteTaskItem,
        setCurrentTaskItem,
        clearCurrentTaskItem,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
