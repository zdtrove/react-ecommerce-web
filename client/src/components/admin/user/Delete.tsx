import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Button, Dialog } from 'components/UI';
import { useEffect } from 'react';
import { userActions, selectLoadingUser } from 'redux/features/user/slice';
import { selectModal } from 'redux/features/ui/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { User } from 'types/user';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  user: User;
};

const Delete = ({ show, setShow, user }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingUser);
  const modal = useAppSelector(selectModal);

  const handleDeleteUser = (id: string) => {
    dispatch(userActions.deleteUser(id));
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="DELETE USER">
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <strong>{user?.fullName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          onClick={() => handleDeleteUser(user?._id || '')}
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
