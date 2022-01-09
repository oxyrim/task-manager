import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import FormInput from './FormInput';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticated } = authContext;
  let navigate = useNavigate();
  useEffect(() => {
    //once register successful redirect to home page
    if (isAuthenticated) {
      navigate('/');
    }
    if (error === 'User already exist.') {
      setAlert(error, 'danger');
      clearError();
    }
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const { name, email, password, confirm_password } = user;

  const onChange = (event) => {
    console.log('on change');
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Register Submit');

    if (name === '' || email === '' || password === '') {
      setAlert('!!! Please enter all the fields', 'danger');
    } else if (password !== confirm_password) {
      setAlert('!!! Passwords do not match', 'danger');
    } else {
      console.log('Register Submit');
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className='d-flex color-overly justify-content-center align-items-center'>
      <Form onSubmit={onSubmit}>
        <h3>Signup</h3>
        <FormInput
          onChange={onChange}
          type='text'
          name='name'
          value={name}
          placeholder='Enter name'
        />
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
        <FormInput
          onChange={onChange}
          type='password'
          name='confirm_password'
          value={confirm_password}
          placeholder='Confirm password'
        />
        <Button variant='dark' className='col-12 mt-2' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
