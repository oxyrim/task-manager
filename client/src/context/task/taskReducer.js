const TaskReducer = (state, action) => {
  console.log(action.payload.list_name);
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
        tasks: [
          // if the task is found find the same task in previous state and replace with new task that has new item added
          ...state.tasks.map((task) => {
            const item = task.id === findTask.id ? findTask : task;
            return item ? item : task;
          }),
        ],
      };
    default:
      return state;
  }
};

export default TaskReducer;
