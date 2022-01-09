import React from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

const FormInput = ({ type, name, value, onChange, placeholder }) => {
  return (
    <Form.Group className='form-outline form-white mb-4"'>
      <Form.Label htmlFor='name'>{_.startCase(_.capitalize(name))}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='form-control form-control-lg'
        //required
      />
    </Form.Group>
  );
};

export default FormInput;
