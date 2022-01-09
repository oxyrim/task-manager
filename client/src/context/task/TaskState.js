import React, { useReducer } from 'react';
import axios from 'axios';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT,
  CLEAR_CURRENT,
  TASK_ERROR,
  GET_TASK,
  CLEAR_TASK,
} from '../types';

const TaskState = (props) => {
  const initialState = {
    tasks: [
      // {
      //   id: 1,
      //   list_name: 'To Do',
      //   items: [
      //     {
      //       id: '1',
      //       item_name: 'Cleaning house.',
      //       due_date: '2021-12-23',
      //     },
      //     {
      //       id: '2',
      //       item_name: 'Coding Project',
      //       due_date: '2021-12-23',
      //     },
      //     {
      //       id: '3',
      //       item_name: 'Send Money',
      //       due_date: '2021-12-23',
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   list_name: 'Doing',
      //   items: [
      //     {
      //       id: '4',
      //       item_name: 'Laundry',
      //       due_date: '2021-12-20',
      //     },
      //     {
      //       id: '5',
      //       item_name: 'Cooking',
      //       due_date: '2021-12-20',
      //     },
      //     {
      //       id: '6',
      //       item_name: 'Cleaning',
      //       due_date: '2021-12-20',
      //     },
      //   ],
      // },
      // {
      //   id: 3,
      //   list_name: 'Done',
      //   items: [
      //     {
      //       id: '7',
      //       item_name: 'Stocking',
      //       due_date: '2021-12-20',
      //     },
      //     {
      //       id: '8',
      //       item_name: 'Paid',
      //       due_date: '2021-12-20',
      //     },
      //     {
      //       id: '9',
      //       item_name: 'Studying',
      //       due_date: '2021-12-20',
      //     },
      //   ],
      // },
    ],
    current: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //Get all the task of the user
  const getTask = async () => {
    try {
      const res = await axios.get('/api/tasks');
      dispatch({ type: GET_TASK, payload: res.data.list });
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Add task
  const addTask = async (task) => {
    //Create header
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/tasks', task, config);
      console.log('res.data: ', res.data);
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
      console.log(state.tasks);
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Update Task
  const updateTask = async (item) => {
    console.log(item);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/tasks/${item.list_id}/${item.task._id}`,
        item,
        config
      );
      console.log('res.data: ', res.data);
      dispatch({
        type: UPDATE_TASK,
        payload: res.data,
      });
      console.log(state.tasks);
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Delete task
  const deleteTaskItem = async (deleteItem) => {
    try {
      await axios.delete(
        `api/tasks/${deleteItem.list_id}/${deleteItem.item_id}`
      );
      dispatch({ type: DELETE_TASK, payload: deleteItem });
    } catch (error) {
      dispatch({
        type: TASK_ERROR,
        payload: error.response.message,
      });
    }
  };

  const clearTask = () => {
    dispatch({ type: CLEAR_TASK });
  };

  //Set Current Task Item
  const setCurrentTaskItem = (item) => {
    dispatch({ type: SET_CURRENT, payload: { item } });
  };

  // Clear Current Task Item
  const clearCurrentTaskItem = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update task

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        erros: state.errors,
        getTask,
        addTask,
        clearTask,
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
