import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';
import { cartActions, selectCartItems, selectOpenCart } from 'redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from 'redux/hook';

const useStyles = makeStyles({
  list: {
    width: 450
  }
});

const Cart = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpenCart);
  const cartItems = useAppSelector(selectCartItems);
  const { closeCart } = cartActions;

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => dispatch(closeCart())}>
        <div className={classes.list} role="presentation">
          {cartItems.map((item) => (
            <Fragment key={item._id}>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </Fragment>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
