import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = ({ title, icon }) => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          <h3>
            <i className={icon} /> {title}
          </h3>
        </Navbar.Brand>
        <Nav className='navbar-nav'>
          <Nav.Link href='/home'>Home</Nav.Link>
          <Nav.Link href='/about'>About</Nav.Link>
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
