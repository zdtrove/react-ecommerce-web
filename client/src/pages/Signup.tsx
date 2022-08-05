import { useState } from 'react';
import { useAppDispatch } from 'redux/hook';
import Layout from 'components/layouts';
import {
  makeStyles,
  Toolbar,
  Paper,
  Box,
  Grid,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
  Zoom,
  Avatar
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Input, RadioGroup, Select, Checkbox, Checkboxes, Button } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import { authActions } from 'redux/features/auth/slice';
import { userConst } from 'constants/index';
import { SignUpPayload } from 'types/auth';
import { useHistory } from 'react-router-dom';

const { GENDER, CITY, PAYMENT_METHODS } = userConst;

const initialValues: SignUpPayload = {
  fullName: '',
  email: '',
  phone: '',
  gender: 'Male',
  city: '',
  payments: [],
  password: '',
  passwordConfirm: '',
  agree: false
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required').max(24, 'Full Name max length is 24'),
  email: Yup.string()
    .email('Email format incorrect')
    .required('Email is required')
    .max(32, 'Email max length is 32'),
  phone: Yup.string().required('Phone is required').max(10, 'Phone max length is 10'),
  city: Yup.string().required('City is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password min length is 6')
    .max(24, 'Password max length is 24'),
  passwordConfirm: Yup.string()
    .required('Password confirm is required')
    .oneOf([Yup.ref('password'), null], 'Password not matched'),
  agree: Yup.bool().oneOf([true], 'Agree must be checked')
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(4),
    maxWidth: 800,
    margin: '0 auto',
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: '3px'
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '5px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    '& .MuiAvatar-root': {
      background: green[500],
      margin: theme.spacing(2)
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      marginLeft: theme.spacing(1)
    },
    marginTop: theme.spacing(1.5)
  },
  tooltip: {
    margin: '7px 0'
  }
}));

const SignUp = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [showPassCf, setShowPassCf] = useState(false);
  const [typePass, setTypePass] = useState('password');
  const [typePassCf, setTypePassCf] = useState('password');

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(authActions.signUp({ signUpData: values, history }));
    }
  });

  const handleShowPass = () => {
    setShowPass(!showPass);
    setTypePass(showPass ? 'password' : 'text');
  };

  const handleShowPassCf = () => {
    setShowPassCf(!showPassCf);
    setTypePassCf(showPassCf ? 'password' : 'text');
  };

  const handlePayments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    checked
      ? formIk.setFieldValue('payments', [...formIk.values.payments, value])
      : formIk.setFieldValue(
          'payments',
          formIk.values.payments.filter((v) => v !== value)
        );
  };

  return (
    <Layout>
      <Toolbar />
      <Paper className={classes.root} component={Box}>
        <Box className={classes.header}>
          <Avatar>
            <LockRoundedIcon color="inherit" />
          </Avatar>
          <Typography variant="h4">Register</Typography>
        </Box>
        <form onSubmit={formIk.handleSubmit}>
          <Grid container>
            <Grid item sm={12}>
              <Input
                label="Full Name"
                {...formIk.getFieldProps('fullName')}
                error={formIk.touched.fullName && formIk.errors.fullName}
                startIcon={<AccountCircleRoundedIcon />}
              />
              <Input
                label="Email"
                {...formIk.getFieldProps('email')}
                error={formIk.touched.email && formIk.errors.email}
                startIcon={<EmailRoundedIcon />}
              />
              <Input
                label="Phone"
                {...formIk.getFieldProps('phone')}
                error={formIk.touched.phone && formIk.errors.phone}
                startIcon={<PhoneAndroidRoundedIcon />}
              />
              <RadioGroup row label="Gender" {...formIk.getFieldProps('gender')} items={GENDER} />
              <Select
                label="City"
                error={formIk.touched.city && formIk.errors.city}
                {...formIk.getFieldProps('city')}
                items={CITY}
              />
              <Checkboxes
                name="payments"
                label="Payment Methods"
                items={PAYMENT_METHODS}
                formIkValue={formIk.values.payments}
                onChange={handlePayments}
              />

              <Input
                type={typePass}
                label="Password"
                {...formIk.getFieldProps('password')}
                error={formIk.touched.password && formIk.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: formIk.values.password && (
                    <InputAdornment position="end" onClick={handleShowPass}>
                      <Tooltip
                        classes={{ tooltipPlacementTop: classes.tooltip }}
                        TransitionComponent={Zoom}
                        arrow
                        title={`${showPass ? 'Hide Password' : 'Show Password'}`}
                        placement="top"
                      >
                        <IconButton size="medium">
                          {showPass ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <Input
                type={typePassCf}
                label="Password Confirm"
                {...formIk.getFieldProps('passwordConfirm')}
                error={formIk.touched.passwordConfirm && formIk.errors.passwordConfirm}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: formIk.values.passwordConfirm && (
                    <InputAdornment position="end" onClick={handleShowPassCf}>
                      <Tooltip
                        classes={{ tooltipPlacementTop: classes.tooltip }}
                        TransitionComponent={Zoom}
                        arrow
                        title={`${showPassCf ? 'Hide Password' : 'Show Password'}`}
                        placement="top"
                      >
                        <IconButton size="medium">
                          {showPassCf ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
              <Checkbox
                label="Agree our terms"
                checked={formIk.values.agree}
                error={formIk.touched.agree && formIk.errors.agree}
                {...formIk.getFieldProps('agree')}
              />
              <div className={classes.buttons}>
                <Button
                  onClick={formIk.handleSubmit}
                  disabled={!(formIk.isValid && formIk.dirty)}
                  text="SIGN UP"
                />
                <Button
                  disabled={!formIk.dirty}
                  onClick={() => formIk.resetForm()}
                  color="secondary"
                  text="RESET"
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Layout>
  );
};

export default SignUp;
