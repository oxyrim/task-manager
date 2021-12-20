import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/layouts/Navbar';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import TaskState from './context/task/TaskState';

const App = () => {
  return (
    <TaskState>
      <Router>
        <Fragment>
          <Navbar />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </Container>
        </Fragment>
      </Router>
    </TaskState>
  );
};

export default App;
