import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import { DialogContent, DialogActions } from '@material-ui/core';
import { Input, Button, Dialog } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HomeIcon from '@material-ui/icons/Home';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { storeActions } from 'redux/features/store/storeSlice';
import { Store } from 'types/store';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(64, 'Name max length is 64'),
  address: Yup.string().required('Address is required').max(254, 'Address max length is 254'),
  region: Yup.string().required('Region is required').max(64, 'Region max length is 64')
});

const initialValues: Store = {
  name: '',
  address: '',
  region: ''
};

type Props = {
  showAdd: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowAdd: (param: boolean) => void;
};

const StoreAdd = ({ showAdd, setShowAdd }: Props) => {
  const dispatch = useAppDispatch();

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(storeActions.addStore(values));
      setShowAdd(false);
    }
  });

  return (
    <Dialog show={showAdd} setShow={setShowAdd} title="STORE ADD">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
            startIcon={<StorefrontIcon />}
          />
          <Input
            label="Address"
            {...formIk.getFieldProps('address')}
            error={formIk.touched.address && formIk.errors.address}
            startIcon={<HomeIcon />}
          />
          <Input
            label="Region"
            {...formIk.getFieldProps('region')}
            error={formIk.touched.region && formIk.errors.region}
            startIcon={<PersonPinCircleIcon />}
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

StoreAdd.propTypes = {
  showAdd: PropTypes.bool,
  setShowAdd: PropTypes.func
};

export default StoreAdd;
