import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { cartActions, selectCartItems, selectOpenCart } from 'redux/features/cart/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import CartItem from './Item';

const useStyles = makeStyles({
  list: {
    width: 550
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
            <CartItem key={item._id} cartItem={item} />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
