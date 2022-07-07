import { useState } from 'react';
import PropTypes from 'prop-types';

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

type Props = {
  children: React.ReactNode;
};

export const Form = ({ children, ...rest }: Props) => {
  return (
    <form autoComplete="off" {...rest}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node
};
