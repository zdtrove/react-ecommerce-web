import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Button, Dialog } from 'components/UI';
import { useEffect } from 'react';
import { productActions, selectLoadingProduct } from 'redux/features/product/slice';
import { selectModal } from 'redux/features/ui/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Product } from 'types/product';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  product: Product;
};

const Delete = ({ show, setShow, product }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingProduct);
  const modal = useAppSelector(selectModal);

  const handleDeleteProduct = (id: string) => {
    dispatch(productActions.deleteProduct(id));
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="DELETE PRODUCT">
      <DialogContent>
        <DialogContentText>
          Are you sure to delete <strong>{product?.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          onClick={() => handleDeleteProduct(product?._id || '')}
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
