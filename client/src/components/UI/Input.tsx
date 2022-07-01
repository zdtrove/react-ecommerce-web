import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  TextFieldProps
} from '@material-ui/core';

type InputProps = {
  multiline?: TextFieldProps['multiline'];
  minRows?: TextFieldProps['minRows'];
  name?: TextFieldProps['name'];
  variant?: TextFieldProps['variant'];
  fullWidth?: TextFieldProps['fullWidth'];
  margin?: TextFieldProps['margin'];
  type?: TextFieldProps['type'];
  error?: any;
  label?: TextFieldProps['label'];
  value: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  InputProps?: AdornmentType;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type AdornmentType = {
  startAdornment?: React.ReactElement;
  endAdornment?: React.ReactElement | '';
};

const Input = ({
  multiline,
  minRows,
  variant,
  fullWidth,
  margin,
  type,
  error,
  startIcon,
  endIcon,
  ...rest
}: InputProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const adornment = () => {
    const result: AdornmentType = {};
    result.startAdornment = startIcon && (
      <InputAdornment position="start">{startIcon}</InputAdornment>
    );
    result.endAdornment = endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>;

    return { InputProps: result };
  };

  return (
    <TextField
      variant={variant || 'outlined'}
      fullWidth={fullWidth || true}
      margin={margin ? margin : matches ? 'normal' : 'dense'}
      type={type || 'text'}
      size={matches ? 'medium' : 'small'}
      multiline={multiline ? true : false}
      {...(minRows && { minRows })}
      {...((startIcon || endIcon) && adornment())}
      {...(error && { error: true, helperText: error })}
      {...rest}
    />
  );
};

Input.propTypes = {
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.any,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element
};

export default Input;
