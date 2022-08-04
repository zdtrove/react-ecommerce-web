import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
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
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { uiActions } from 'redux/features/ui/slice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: 'azure'
    }
  },
  list: {
    width: 550,
    position: 'relative',
    paddingBottom: theme.spacing(6),
    '& .MuiTypography-h4': {
      padding: 10
    }
  },
  close: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  total: {
    margin: '0 10px'
  },
  totalPrice: {
    fontWeight: 700,
    color: theme.palette.secondary.main
  }
}));

const Cart = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpenCart);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotalAmount = useAppSelector(selectCartTotalAmount);
  const { closeCart, clear } = cartActions;
  const { showSnackbar } = uiActions;

  return (
    <>
      <Drawer
        className={classes.root}
        anchor="right"
        open={open}
        onClose={() => dispatch(closeCart())}
      >
        <div className={classes.list} role="presentation">
          <IconButton className={classes.close} onClick={() => dispatch(closeCart())}>
            <CloseIcon />
          </IconButton>
          <Box display="flex" justifyContent="center" p={1}>
            <img style={{ width: 100 }} src="/logo.png" alt="cart" />
          </Box>
          {cartItems.length ? (
            <>
              <Divider />
              {cartItems.map((item) => (
                <CartItem key={item._id} cartItem={item} />
              ))}
              <List className={classes.total} dense>
                <ListItem>
                  <ListItemText primary={<Typography variant="h5">Total:</Typography>} />
                  <ListItemSecondaryAction>
                    <Box display="flex" justifyContent="left" alignItems="center">
                      <AttachMoneyIcon style={{ color: 'green' }} />
                      <ListItemText
                        primary={
                          <Typography className={classes.totalPrice} variant="h5">
                            {formatNumber(cartTotalAmount)}
                          </Typography>
                        }
                      />
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="contained"
                  color="secondary"
                  text="Clear cart"
                  size="large"
                  onClick={() => dispatch(clear())}
                  startIcon={<HighlightOffIcon />}
                />
                <Button
                  variant="contained"
                  color="primary"
                  text="Order"
                  size="large"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() =>
                    dispatch(showSnackbar({ status: 'warning', message: 'Under construction' }))
                  }
                />
              </Box>
            </>
          ) : (
            <Typography variant="h5" align="center" style={{ padding: '50px 0' }}>
              Your cart is empty
            </Typography>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
