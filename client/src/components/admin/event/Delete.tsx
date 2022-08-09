import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Button, Dialog } from 'components/UI';
import { useEffect } from 'react';
import { eventActions, selectLoadingEvent } from 'redux/features/event/slice';
import { selectModal } from 'redux/features/ui/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Event } from 'types/event';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  event: Event;
};

const Delete = ({ show, setShow, event }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingEvent);
  const modal = useAppSelector(selectModal);

  const handleDeleteEvent = (id: string) => {
    dispatch(eventActions.deleteEvent(id));
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="DELETE EVENT">
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <strong>{event?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          onClick={() => handleDeleteEvent(event?._id || '')}
          color="secondary"
          text="DELETE"
          disabled={loading}
        />
        <Button onClick={() => setShow(false)} color="default" text="CANCEL" />
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
