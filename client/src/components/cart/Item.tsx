import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  Avatar,
  Divider,
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { cartActions } from 'redux/features/cart/slice';
import { formatNumber } from 'utils/functions';
import { selectProducts } from 'redux/features/product/slice';

type Props = {
  cartItem: CartItem;
};

const useStyles = makeStyles((theme) => ({
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
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.dark
    }
  }
}));

const CartItemComponent = ({ cartItem }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const { decrement, increment, remove } = cartActions;

  return (
    <>
      <List dense className={classes.root}>
        <ListItem>
          <IconButton
            onClick={() => dispatch(remove({ product: cartItem, products, inCart: false }))}
            size="small"
            style={{ padding: 8 }}
          >
            <DeleteForeverIcon color="secondary" />
          </IconButton>
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
      <Divider />
    </>
  );
};

export default CartItemComponent;
