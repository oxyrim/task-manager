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
      //If its new list
      if (action.payload.items.length === 0) {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          loading: false,
        };
      }
      // If adding item inside list
      // Find the task that matches the list which send add request.
      const findTask = [...state.tasks].find(
        (task) => task.list_name === action.payload.list_name
      );
      findTask.items = action.payload.items;
      return {
        ...state,
        //tasks: [...state.tasks, findTask],
        loading: false,
      };

    case UPDATE_TASK:
      const updateTaskItem = [...state.tasks].find(
        (task) => task._id === action.payload._id
      );
      updateTaskItem.items = action.payload.items;
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
