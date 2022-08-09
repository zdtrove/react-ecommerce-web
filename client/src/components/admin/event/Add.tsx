import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { DialogContent, DialogActions, CircularProgress } from '@material-ui/core';
import { Input, Button, Dialog } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { eventActions, selectLoadingEvent } from 'redux/features/event/slice';
import { Event } from 'types/event';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { selectModal } from 'redux/features/ui/slice';

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
  enName: '',
  description: '',
  enDescription: '',
  startDate: new Date(),
  endDate: new Date()
};

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
};

const Add = ({ show, setShow }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingEvent);
  const modal = useAppSelector(selectModal);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(eventActions.addEvent(values));
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

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="EVENT ADD">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
            startIcon={<EventNoteIcon />}
          />
          <Input
            label="English Name"
            {...formIk.getFieldProps('enName')}
            error={formIk.touched.enName && formIk.errors.enName}
            startIcon={<EventNoteIcon />}
          />
          <Input
            label="Description"
            {...formIk.getFieldProps('description')}
            error={formIk.touched.description && formIk.errors.description}
            multiline
            minRows={4}
          />
          <Input
            label="English Description"
            {...formIk.getFieldProps('enDescription')}
            error={formIk.touched.enDescription && formIk.errors.enDescription}
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
        {loading && <CircularProgress size={25} />}
        <Button
          disabled={!(formIk.isValid && formIk.dirty) || loading}
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
  show: PropTypes.bool,
  setShow: PropTypes.func
};

export default Add;
