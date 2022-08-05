import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import { DialogContent, DialogActions } from '@material-ui/core';
import { Input, RadioGroup, Select, Checkboxes, Button, Dialog } from 'components/UI';
import { userConst } from 'constants/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import { User } from 'types/user';
import { userActions } from 'redux/features/user/slice';

const { GENDER, CITY, PAYMENT_METHODS, ROLES } = userConst;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required').max(24, 'Full Name max length is 24'),
  phone: Yup.string().required('Phone is required').max(10, 'Phone max length is 10'),
  city: Yup.string().required('City is required')
});

type Props = {
  showEdit: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowEdit: (param: boolean) => void;
  userRecord: User;
};

const Edit = ({ showEdit, setShowEdit, userRecord }: Props) => {
  const dispatch = useAppDispatch();
  const { _id, email, fullName, phone, gender, city, payments, role, wishlist } = userRecord;

  let initialValues: User = {
    email,
    fullName,
    phone,
    gender,
    city,
    payments,
    role,
    wishlist
  };

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
      dispatch(userActions.updateUser({ _id, ...values }));
      setShowEdit(false);
    }
  });

  return (
    <Dialog show={showEdit} setShow={setShowEdit} title="USER EDIT">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input name="email" label="Email" type="email" value={formIk.values.email} disabled />
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

Edit.propTypes = {
  showEdit: PropTypes.bool,
  setShowEdit: PropTypes.func,
  userRecord: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    city: PropTypes.string,
    payments: PropTypes.array,
    role: PropTypes.string,
    wishlist: PropTypes.array
  })
};

export default Edit;
