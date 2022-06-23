import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox
} from '@material-ui/core';

type CheckboxProps = {
  label?: string;
  error?: any;
};

const Checkbox = ({ label, error, ...rest }: CheckboxProps) => {
  return (
    <FormControl {...(error && { error: true })}>
      <FormControlLabel control={<MuiCheckbox {...rest} />} label={label} />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  error: PropTypes.any
};

export default Checkbox;
