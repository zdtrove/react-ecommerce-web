import PropTypes from 'prop-types';
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-root': {
      padding: `${theme.spacing(1.3)}px ${theme.spacing(1.8)}px`,
      [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(2.25)}px ${theme.spacing(1.8)}px`
      }
    },
    '& .MuiInputLabel-outlined': {
      transform: `translate(9px, 13px) scale(1)`,
      [theme.breakpoints.up('sm')]: {
        transform: `translate(14px, 20px) scale(1)`
      }
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: `translate(14px, -6px) scale(0.75)`
    }
  },
  paddingLv2: {
    paddingLeft: 50
  },
  paddingLv3: {
    paddingLeft: 100
  },
  paddingLv4: {
    paddingLeft: 150
  },
  paddingLv5: {
    paddingLeft: 200
  }
}));

type MuiSelectProps = {
  label?: string;
  error?: any;
  items?: any[];
  isObject?: boolean;
};

const Select = ({ label, error, items, isObject, ...rest }: MuiSelectProps) => {
  const classes = useStyles();

  return (
    <FormControl
      margin="normal"
      fullWidth
      variant="outlined"
      {...(error && { error: true })}
      className={classes.root}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} {...rest}>
        {isObject
          ? items &&
            items.map((item, index) => {
              let levelClass;
              if (item.level === 2) levelClass = classes.paddingLv2;
              if (item.level === 3) levelClass = classes.paddingLv3;
              if (item.level === 4) levelClass = classes.paddingLv4;
              if (item.level === 5) levelClass = classes.paddingLv5;
              return (
                <MenuItem className={levelClass} key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })
          : items &&
            items.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.any,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      level: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.number
    }) || PropTypes.string
  ),
  isObject: PropTypes.bool
};

export default Select;
