import PropTypes from 'prop-types';
import { Button as MuiButton, makeStyles, ButtonProps } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none'
  }
}));

type MuiButtonProps = {
  text?: string;
  size?: ButtonProps['size'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  disableRipple?: ButtonProps['disableRipple'];
  // eslint-disable-next-line no-unused-vars
  onClick?: (e?: any) => void;
  className?: string;
  to?: string;
  component?: any;
  startIcon?: React.ReactElement;
};

const Button = ({ text, size, color, variant, onClick, ...rest }: MuiButtonProps) => {
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'small'}
      color={color || 'primary'}
      onClick={onClick}
      {...rest}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
