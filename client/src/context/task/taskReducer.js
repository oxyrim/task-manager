const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const taskObj = [...state.tasks];
      // Find the task that matches the task which send add request.
      const findTask = taskObj.find(
        (task) => task.list_name === action.payload.list_name
      );
      findTask.items.push(action.payload.item);
      return {
        ...state,
        // tasks: [
        //   // if the task is found find the same task in previous state and replace with new task that has new item added
        //   ...state.tasks.map((task) => {
        //     const item = task.id === findTask.id ? findTask : task;
        //     return item ? item : task;
        //   }),
        //],
      };

    case 'UPDATE_TASK':
      const updateTaskItem = [...state.tasks].find(
        (task) => task.id === action.payload.list_id
      );
      const updateItem = updateTaskItem.items.map((item) => {
        return item.id === action.payload.task.id ? action.payload.task : item;
      });

      updateTaskItem.items = updateItem;
      return {
        ...state,
      };

    case 'DELETE_TASK':
      const deleteTask = [...state.tasks].find(
        (task) => task.id === action.payload.list_id
      );
      const keepItems = deleteTask.items.filter(
        (item) => item.id !== action.payload.item_id
      );
      deleteTask.items = keepItems;
      return {
        ...state,
      };

    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload.item,
      };

    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};

export default TaskReducer;
