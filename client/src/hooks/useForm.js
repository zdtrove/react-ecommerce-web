import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetForm
  };
};

export const Form = ({ children, ...rest }) => {
  return (
    <form autoComplete="off" {...rest}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node
};
