import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CartItem } from 'types/cart';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Button } from 'components/UI';
import { cartActions } from 'redux/features/cart/slice';
import { formatNumber } from 'utils/functions';
import { selectProducts } from 'redux/features/product/slice';

type Props = {
  cartItem: CartItem;
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

const CartItemComponent = ({ cartItem }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
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
            <>
              <Typography variant="caption">{formatNumber(cartItem.price)}</Typography>
              <br />
              <Button
                onClick={() => dispatch(remove({ product: cartItem, products, inCart: false }))}
                text="Remove"
                size="small"
                color="secondary"
              />
            </>
          }
        />
        <ListItemText primary={`${formatNumber(cartItem.totalAmount!)}`} />
        <ListItemSecondaryAction className={classes.action}>
          <IconButton
            onClick={() => dispatch(decrement({ product: cartItem, products, inCart: false }))}
          >
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

export default CartItemComponent;
