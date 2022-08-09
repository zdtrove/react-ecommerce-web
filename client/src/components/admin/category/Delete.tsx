import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Button, Dialog } from 'components/UI';
import { useEffect } from 'react';
import { categoryActions, selectLoadingCategory } from 'redux/features/category/slice';
import { selectModal } from 'redux/features/ui/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Category } from 'types/category';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  category: Category;
};

const Delete = ({ show, setShow, category }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingCategory);
  const modal = useAppSelector(selectModal);

  const handleDeleteCategory = (id: string) => {
    dispatch(categoryActions.deleteCategory(id));
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="DELETE CATEGORY">
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <strong>{category?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          onClick={() => handleDeleteCategory(category?._id || '')}
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
