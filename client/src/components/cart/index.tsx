import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'components/UI';
import {
  cartActions,
  selectCartItems,
  selectCartTotalAmount,
  selectOpenCart
} from 'redux/features/cart/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { formatNumber } from 'utils/functions';
import CartItem from './Item';

const useStyles = makeStyles({
  root: {},
  list: {
    width: 550,
    '& .MuiTypography-h4': {
      padding: 10
    }
  },
  total: {
    margin: '0 10px'
  }
});

const Cart = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpenCart);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotalAmount = useAppSelector(selectCartTotalAmount);
  const { closeCart } = cartActions;

  return (
    <>
      <Drawer
        className={classes.root}
        anchor="right"
        open={open}
        onClose={() => dispatch(closeCart())}
      >
        <div className={classes.list} role="presentation">
          <Typography variant="h4" align="center">
            Your Cart
          </Typography>
          {cartItems.length ? (
            <>
              {cartItems.map((item) => (
                <CartItem key={item._id} cartItem={item} />
              ))}
              <List className={classes.total} dense>
                <ListItem>
                  <ListItemText primary={<Typography variant="h5">Total:</Typography>} />
                  <ListItemSecondaryAction>
                    <ListItemText
                      primary={
                        <Typography variant="h5">{formatNumber(cartTotalAmount)}</Typography>
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" color="secondary" text="Clear cart" size="large" />
                <Button variant="contained" color="primary" text="Order" size="large" />
              </Box>
            </>
          ) : (
            <Typography variant="h5" align="center">
              Your cart is empty
            </Typography>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
