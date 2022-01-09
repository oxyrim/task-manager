import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import TaskContext from '../../context/task/taskContext';

const NavigationBar = ({ title, icon }) => {
  const taskContext = useContext(TaskContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearTask } = taskContext;

  const onLogout = () => {
    logout();
    clearTask();
  };

  const authLinks = (
    <Fragment>
      <Nav.Link href='/'>Home</Nav.Link>
      <Nav.Link href='/about'>About</Nav.Link>
      <Nav.Link>{user && user.name}</Nav.Link>
      <Nav.Link onClick={onLogout}>
        <i className='fas fa-sign-out-alt'></i> Logout
      </Nav.Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav.Link href='/register'>Register</Nav.Link>
      <Nav.Link href='/login'>Login</Nav.Link>
    </Fragment>
  );

  return (
    <Navbar bg='dark' sticky='top' variant='dark'>
      <Container>
        <Navbar.Brand>
          <h3>
            <i className={icon} /> {title}
          </h3>
        </Navbar.Brand>
        <Nav className='navbar-nav'>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Container>
    </Navbar>
  );
};
NavigationBar.prototype = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

NavigationBar.defaultProps = {
  title: 'Task Manager',
  icon: 'fas fa-tasks',
};

export default NavigationBar;
