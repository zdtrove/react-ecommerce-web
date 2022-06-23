import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { DialogContent, DialogActions } from '@material-ui/core';
import { Input, RadioGroup, Select, Checkboxes, Button, Dialog } from 'components/UI';
import { userConst } from 'constants/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'redux/actions/user.action';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import { User } from 'constants/types';

const { GENDER, CITY, PAYMENT_METHODS, ROLES } = userConst;

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Full Name is required').max(24, 'Full Name max length is 24'),
  phone: Yup.string().required('Phone is required').max(10, 'Phone max length is 10'),
  city: Yup.string().required('City is required')
});

type UserEditProps = {
  showUserEdit: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowUserEdit: (param: boolean) => void;
  userRecord: User;
};

const UserEdit = ({ showUserEdit, setShowUserEdit, userRecord }: UserEditProps) => {
  const dispatch = useDispatch();
  const { _id, email, fullname, phone, gender, city, payments, role } = userRecord;

  let initialValues = {
    email,
    fullname,
    phone,
    gender,
    city,
    payments,
    role
  };

  const handlePayments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      formik.setFieldValue('payments', [...formik.values.payments, value]);
    } else {
      formik.setFieldValue(
        'payments',
        formik.values.payments.filter((v) => v !== value)
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(updateUser({ _id, ...values }));
      setShowUserEdit(false);
    }
  });

  return (
    <Dialog show={showUserEdit} setShow={setShowUserEdit} title="USER EDIT">
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Input name="email" label="Email" type="email" value={formik.values.email} disabled />
          <Input
            label="Full Name"
            {...formik.getFieldProps('fullname')}
            error={formik.touched.fullname && formik.errors.fullname}
            startIcon={<AccountCircleRoundedIcon />}
          />
          <Input
            label="Phone"
            {...formik.getFieldProps('phone')}
            error={formik.touched.phone && formik.errors.phone}
            startIcon={<PhoneAndroidRoundedIcon />}
          />
          <RadioGroup row label="Gender" {...formik.getFieldProps('gender')} items={GENDER} />
          <RadioGroup row label="Role" {...formik.getFieldProps('role')} items={ROLES} />
          <Select
            label="City"
            error={formik.touched.city && formik.errors.city}
            {...formik.getFieldProps('city')}
            items={CITY}
          />
          <Checkboxes
            name="payments"
            label="Payment Methods"
            items={PAYMENT_METHODS}
            formikValue={formik.values.payments}
            onChange={handlePayments}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!(formik.isValid && formik.dirty)}
          onClick={() => formik.submitForm()}
          text="SAVE"
        />
        <Button
          disabled={!formik.dirty}
          onClick={() => formik.resetForm()}
          color="secondary"
          text="RESET"
        />
      </DialogActions>
    </Dialog>
  );
};

UserEdit.propTypes = {
  showUserEdit: PropTypes.bool,
  setShowUserEdit: PropTypes.func,
  userRecord: PropTypes.shape({
    _id: PropTypes.number,
    email: PropTypes.string,
    fullname: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    city: PropTypes.string,
    payments: PropTypes.array,
    role: PropTypes.string
  })
};

export default UserEdit;
