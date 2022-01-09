import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import TaskState from './context/task/TaskState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layouts/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage);
}

const App = () => {
  return (
    <AuthState>
      <TaskState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Container>
                <Alerts />
                <Routes>
                  <Route
                    path='/'
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route path='/about' element={<About />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </Container>
            </Fragment>
          </Router>
        </AlertState>
      </TaskState>
    </AuthState>
  );
};

export default App;
