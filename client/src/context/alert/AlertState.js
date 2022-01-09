import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, CLEAR_ALERT } from '../types';
import { v4 } from 'uuid';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (message, type) => {
    console.log('msg: ', message, 'type: ', type);
    const id = v4();
    dispatch({
      type: SET_ALERT,
      payload: { message, type, id },
    });
    setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

// import { useReducer } from 'react';
// import AlertContext from './alertContext';
// import alertReducer from './alertReducer';
// import { SET_ALERT, CLEAR_ALERT } from '../types';
// import { v4 } from 'uuid';

// const AlertState = (props) => {
//   const initialState = [];

//   const [state, dispatch] = useReducer(alertReducer, initialState);

//   // Set Alert
//   const setAlert = (message, type) => {
//     const id = v4();
//     dispatch({ type: SET_ALERT, payload: { message, type, id } });
//     setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), 5000);
//   };

//   return (
//     <AlertContext.Provider
//       value={{
//         alerts: state,
//         setAlert,
//       }}
//     >
//       {props.children}
//     </AlertContext.Provider>
//   );
// };

// export default AlertState;
