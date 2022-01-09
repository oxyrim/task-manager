import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_TASK,
  GET_TASK,
  TASK_ERROR,
} from '../types';

const TaskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case ADD_TASK:
      console.log(action.payload.items);
      if (action.payload.items.length === 0) {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          loading: false,
        };
      }
      // Find the task that matches the task which send add request.
      const findTask = [...state.tasks].find(
        (task) => task.list_name === action.payload.list_name
      );
      findTask.items = action.payload.items;
      console.log('State', state.tasks);
      return {
        ...state,
        //tasks: [...state.tasks, findTask],
        loading: false,
        // tasks: [
        //   // if the task is found find the same task in previous state and replace with new task that has new item added
        //   ...state.tasks.map((task) => {
        //     const item = task.id === findTask.id ? findTask : task;
        //     return item ? item : task;
        //   },
        //],)
      };

    case UPDATE_TASK:
      const updateTaskItem = [...state.tasks].find(
        (task) => task.id === action.payload.list_id
      );
      const updateItem = updateTaskItem.items.map((item) => {
        return item.id === action.payload.task.id ? action.payload.task : item;
      });

      updateTaskItem.items = updateItem;
      return {
        ...state,
        loading: false,
      };

    case DELETE_TASK:
      console.log(state.tasks);
      const deleteTask = [...state.tasks].find(
        (task) => task._id === action.payload.list_id
      );
      const keepItems = deleteTask.items.filter(
        (item) => item._id !== action.payload.item_id
      );
      deleteTask.items = keepItems;
      return {
        ...state,
        loading: false,
      };

    case CLEAR_TASK:
      return {
        ...state,
        tasks: [],
        errors: null,
        current: null,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload.item,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case TASK_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default TaskReducer;
