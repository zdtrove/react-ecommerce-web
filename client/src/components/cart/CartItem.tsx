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

type Props = {
  cartItem: CartItemType;
};

const useStyles = makeStyles({
  root: {
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      margin: '0 5px'
    },
    '& .MuiAvatar-root': {
      width: 60,
      height: 60,
      marginRight: 10
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
        <ListItemText primary={cartItem.name} secondary={<Button text="Remove" size="small" />} />
        <ListItemSecondaryAction className={classes.action}>
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <ListItemText primary={1} />
          <IconButton>
            <AddCircleOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

export default CartItem;
