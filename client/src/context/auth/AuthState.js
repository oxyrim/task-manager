import { useContext, useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERROR,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User, check for logged in user and load that user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      //check is the user exist with token and if the user exist
      //receive user as response
      const res = await axios.get('/api/auth');
      //send user as payload(res.data=>user)
      console.log(res.data);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  // Register user and get the token
  const register = async (registerFormData) => {
    const config = {
      //header type
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', registerFormData, config);
      //If registration successfull, receives token as reponse(res.data=>token)
      //and dispatch token
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      //once register stay logged in
      loadUser();
    } catch (error) {
      //send error response
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  // Login User, log the user in and get the token
  const login = async (registerFormData) => {
    const config = {
      //header type
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', registerFormData, config);
      //If registration successfull, receives token as reponse(res.data=>token)
      //and dispatch token
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      //once register stay logged in
      loadUser();
    } catch (error) {
      //send error response
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        clearError,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
