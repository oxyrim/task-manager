import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FormInput from './FormInput';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { login, error, clearError, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate();
  useEffect(() => {
    //once register successful redirect to home page
    if (isAuthenticated) {
      navigate('/');
    }
    if (error === 'Invalid email/password') {
      setAlert(error, 'danger');
      clearError();
    }
  }, [error, isAuthenticated]);

  const { email, password } = user;

  const onChange = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all the fields');
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className='d-flex color-overly justify-content-center align-items-center'>
      <Form onSubmit={onSubmit}>
        <h3>Login</h3>
        <FormInput
          onChange={onChange}
          type='email'
          name='email'
          value={email}
          placeholder='Enter email'
        />
        <FormInput
          onChange={onChange}
          type='password'
          name='password'
          value={password}
          placeholder='Enter password'
        />
        <Button variant='dark' className='col-12 mt-2' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
