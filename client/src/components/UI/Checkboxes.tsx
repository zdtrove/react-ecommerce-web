import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Checkbox
} from '@material-ui/core';

type CheckboxesProps = {
  label?: string;
  name?: string;
  items?: any[];
  formIkValue: any[];
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkboxes = ({ label, name, items, formIkValue, error, ...rest }: CheckboxesProps) => {
  return (
    <FormControl margin="normal">
      <FormLabel>{label}</FormLabel>
      <FormGroup row>
        {items &&
          items.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox name={name} value={item} checked={formIkValue.includes(item)} {...rest} />
              }
              label={item}
            />
          ))}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

Checkboxes.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any),
  formIkValue: PropTypes.arrayOf(PropTypes.any).isRequired,
  error: PropTypes.string
};

export default Checkboxes;
