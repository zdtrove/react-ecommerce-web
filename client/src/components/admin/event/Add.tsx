import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import { DialogContent, DialogActions } from '@material-ui/core';
import { Input, Button, Dialog } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { eventActions } from 'redux/features/event/slice';
import { Event } from 'types/event';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(64, 'Name max length is 64'),
  description: Yup.string()
    .required('Description is required')
    .max(1000, 'Description max length is 1000'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().required('End date is required')
});

const initialValues: Event = {
  name: '',
  description: '',
  startDate: new Date(),
  endDate: new Date()
};

type Props = {
  showAdd: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowAdd: (param: boolean) => void;
};

const Add = ({ showAdd, setShowAdd }: Props) => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(eventActions.addEvent(values));
      setShowAdd(false);
    }
  });

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    formIk.setFieldValue('startDate', date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    formIk.setFieldValue('endDate', date);
  };

  return (
    <Dialog show={showAdd} setShow={setShowAdd} title="EVENT ADD">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
            startIcon={<EventNoteIcon />}
          />
          <Input
            label="Description"
            {...formIk.getFieldProps('description')}
            error={formIk.touched.description && formIk.errors.description}
            multiline
            minRows={4}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              label="Start date"
              margin="normal"
              id="date-picker-inline"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              autoOk
              InputProps={{
                readOnly: true
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              label="End date"
              margin="normal"
              id="date-picker-inline"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              autoOk
              InputProps={{
                readOnly: true
              }}
            />
          </MuiPickersUtilsProvider>
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

Add.propTypes = {
  showAdd: PropTypes.bool,
  setShowAdd: PropTypes.func
};

export default Add;
