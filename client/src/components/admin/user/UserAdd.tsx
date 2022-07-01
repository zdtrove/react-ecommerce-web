import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import {
  makeStyles,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Zoom,
  Tooltip
} from '@material-ui/core';
import { Input, RadioGroup, Select, Checkboxes, Button, Dialog } from 'components/UI';
import { userConst } from 'constants/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { userActions } from 'redux/features/user/userSlice';
import { User } from 'types/user';

const { GENDER, CITY, PAYMENT_METHODS, ROLES } = userConst;

const useStyles = makeStyles(() => ({
  tooltip: {
    margin: '7px 0'
  }
}));

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
    .oneOf([Yup.ref('password'), null], 'Password not matched')
});

const initialValues: User = {
  fullName: '',
  email: '',
  phone: '',
  gender: 'Male',
  city: '',
  payments: [],
  password: '',
  passwordConfirm: '',
  role: 'user'
};

type UserAddProps = {
  showUserAdd: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowUserAdd: (param: boolean) => void;
};

const UserAdd = ({ showUserAdd, setShowUserAdd }: UserAddProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState(false);
  const [showPassCf, setShowPassCf] = useState(false);
  const [typePass, setTypePass] = useState('password');
  const [typePassCf, setTypePassCf] = useState('password');

  const handlePayments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      formIk.setFieldValue('payments', [...formIk.values.payments, value]);
    } else {
      formIk.setFieldValue(
        'payments',
        formIk.values.payments.filter((v) => v !== value)
      );
    }
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userActions.addUser(values));
      setShowUserAdd(false);
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

  return (
    <Dialog show={showUserAdd} setShow={setShowUserAdd} title="USER EDIT">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Email"
            type="email"
            {...formIk.getFieldProps('email')}
            error={formIk.touched.email && formIk.errors.email}
            startIcon={<EmailRoundedIcon />}
          />
          <Input
            label="Full Name"
            {...formIk.getFieldProps('fullName')}
            error={formIk.touched.fullName && formIk.errors.fullName}
            startIcon={<AccountCircleRoundedIcon />}
          />
          <Input
            label="Phone"
            {...formIk.getFieldProps('phone')}
            error={formIk.touched.phone && formIk.errors.phone}
            startIcon={<PhoneAndroidRoundedIcon />}
          />
          <RadioGroup row label="Gender" {...formIk.getFieldProps('gender')} items={GENDER} />
          <RadioGroup row label="Role" {...formIk.getFieldProps('role')} items={ROLES} />
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!(formIk.isValid && formIk.dirty)}
          onClick={() => formIk.submitForm()}
          text="SAVE"
        />
        <Button
          disabled={!formIk.dirty}
          onClick={() => formIk.resetForm()}
          color="secondary"
          text="RESET"
        />
      </DialogActions>
    </Dialog>
  );
};

UserAdd.propTypes = {
  showUserAdd: PropTypes.bool,
  setShowUserAdd: PropTypes.func
};

export default UserAdd;
