import { useAppDispatch } from 'redux/hook';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CartItemType } from 'types/cart';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Button } from 'components/UI';
import { cartActions } from 'redux/features/cart/cartSlice';

type Props = {
  cartItem: CartItemType;
};

const useStyles = makeStyles({
  root: {
    '& .MuiListItemText-primary': {
      fontWeight: 'bold'
    },
    '& .MuiAvatar-root': {
      width: 60,
      height: 60,
      margin: '0 10px'
    },
    '& .MuiButtonBase-root': {
      margin: '5px 0'
    }
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const CartItem = ({ cartItem }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { decrement, increment, remove } = cartActions;

  return (
    <List dense className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            variant="square"
            alt={'product'}
            src={cartItem.images ? cartItem.images[0]?.url : ''}
          />
        </ListItemAvatar>
        <ListItemText
          primary={cartItem.name}
          secondary={
            <Button onClick={() => dispatch(remove(cartItem))} text="Remove" size="small" />
          }
        />
        <ListItemText primary={`${cartItem.totalAmount}$`} />
        <ListItemSecondaryAction className={classes.action}>
          <IconButton onClick={() => dispatch(decrement(cartItem))}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <ListItemText primary={cartItem.quantity} />
          <IconButton onClick={() => dispatch(increment(cartItem))}>
            <AddCircleOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

export default CartItem;
