import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio
} from '@material-ui/core';

type Props = {
  label?: string;
  items?: any[];
  row?: boolean;
};

const RadioGroup = ({ label, items, ...rest }: Props) => {
  return (
    <FormControl margin="normal" fullWidth>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row {...rest}>
        {items &&
          items.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio color="primary" />}
              label={item}
            />
          ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string)
};

export default RadioGroup;
