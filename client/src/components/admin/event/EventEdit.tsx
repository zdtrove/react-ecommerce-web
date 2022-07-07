import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import { DialogContent, DialogActions } from '@material-ui/core';
import { Input, Button, Dialog } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { eventActions } from 'redux/features/event/eventSlice';
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

type Props = {
  showEventEdit: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowEventEdit: (param: boolean) => void;
  eventRecord: Event;
};

const EventEdit = ({ showEventEdit, setShowEventEdit, eventRecord }: Props) => {
  const dispatch = useAppDispatch();
  const { _id, name, description, startDate, endDate } = eventRecord;
  const [startDateEdit, setStartDateEdit] = useState<Date | null>(startDate);
  const [endDateEdit, setEndDateEdit] = useState<Date | null>(endDate);

  const initialValues: Event = {
    name,
    description,
    startDate,
    endDate
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(eventActions.updateEvent({ _id, ...values }));
      setShowEventEdit(false);
    }
  });

  const handleStartDateChange = (date: Date | null) => {
    setStartDateEdit(date);
    formIk.setFieldValue('startDate', date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDateEdit(date);
    formIk.setFieldValue('endDate', date);
  };

  return (
    <Dialog show={showEventEdit} setShow={setShowEventEdit} title="EVENT ADD">
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
              value={startDateEdit}
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
              value={endDateEdit}
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

EventEdit.propTypes = {
  showEventEdit: PropTypes.bool,
  setShowEventEdit: PropTypes.func
};

export default EventEdit;
