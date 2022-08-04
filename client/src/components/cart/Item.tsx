import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  Avatar,
  Box,
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
import { useHistory } from 'react-router-dom';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
      marginRight: 10,
      marginLeft: 5
    },
    '& .MuiButtonBase-root': {
      margin: '5px 0'
    },
    '& .MuiListItem-root': {
      paddingLeft: 5
    }
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.dark
    }
  },
  name: {
    maxWidth: 200,
    paddingRight: theme.spacing(1),
    cursor: 'pointer'
  },
  price: {
    color: theme.palette.secondary.main
  }
}));

const CartItemComponent = ({ cartItem }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const products = useAppSelector(selectProducts);
  const { decrement, increment, remove } = cartActions;
  const { closeCart } = cartActions;

  const goToProduct = () => {
    dispatch(closeCart());
    history.push(`/product/${cartItem._id}`);
  };

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
              onClick={goToProduct}
              variant="square"
              alt={'product'}
              src={cartItem.images ? cartItem.images[0]?.url : ''}
              style={{ cursor: 'pointer' }}
            />
          </ListItemAvatar>
          <ListItemText
            onClick={goToProduct}
            className={classes.name}
            primary={cartItem.name}
            secondary={
              <Box display="flex" justifyContent="left" alignItems="center">
                <AttachMoneyIcon style={{ color: 'green', fontSize: 12 }} />
                <Typography variant="caption">{formatNumber(cartItem.price)}</Typography>
              </Box>
            }
          />
          <Box display="flex" justifyContent="left" alignItems="center">
            <AttachMoneyIcon style={{ color: 'green', fontSize: 14 }} />
            <ListItemText
              className={classes.price}
              primary={`${formatNumber(cartItem.totalAmount!)}`}
            />
          </Box>
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
