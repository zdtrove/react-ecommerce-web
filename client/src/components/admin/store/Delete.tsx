import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Button, Dialog } from 'components/UI';
import { useEffect } from 'react';
import { storeActions, selectLoadingStore } from 'redux/features/store/slice';
import { selectModal } from 'redux/features/ui/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Store } from 'types/store';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  store: Store;
};

const Delete = ({ show, setShow, store }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingStore);
  const modal = useAppSelector(selectModal);

  const handleDeleteStore = (id: string) => {
    dispatch(storeActions.deleteStore(id));
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="DELETE STORE">
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <strong>{store?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          onClick={() => handleDeleteStore(store?._id || '')}
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
