import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { Alert } from 'react-bootstrap';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  console.log(alertContext.alerts);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Alert key={alert.id} variant={alert.type}>
        {alert.message}
      </Alert>
    ))
  );
};

export default Alerts;
