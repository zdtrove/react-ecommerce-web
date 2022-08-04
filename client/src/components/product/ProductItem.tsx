import { Box, Typography, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import { Product } from 'types/product';
import { formatNumber } from 'utils/functions';
import StarIcon from '@material-ui/icons/Star';
import { Button } from 'components/UI';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { cartActions } from 'redux/features/cart/slice';
import { selectProducts } from 'redux/features/product/slice';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    maxWidth: 227,
    padding: 10,
    borderRadius: 5,
    minHeight: 370,
    border: `1px solid ${theme.palette.primary.dark}`,
    position: 'relative',
    cursor: 'pointer',
    '& figure': {
      width: '90%',
      textAlign: 'center',
      margin: '0 auto',
      minHeight: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& img': {
        width: '100%',
        transition: 'all 200ms ease-in-out',
        marginTop: theme.spacing(1.5),
        marginBottom: 0,
        '&:hover': {
          marginBottom: theme.spacing(1.5),
          marginTop: 0
        }
      }
    },
    '& .MuiButtonBase-root': {
      padding: '2px 16px',
      borderRadius: 20
    }
  },
  name: {
    fontWeight: 700,
    padding: '3px 0'
  },
  price: {
    fontWeight: 700
  },
  star: {
    '& .MuiSvgIcon-root': {
      width: 25,
      height: 'auto',
      padding: '3px 0',
      marginRight: 5
    },
    '& small': {
      fontWeight: 700
    }
  },
  addToCart: {
    backgroundColor: theme.palette.green.dark,
    marginLeft: 0
  },
  action: {
    position: 'absolute',
    bottom: theme.spacing(1),
    columnGap: theme.spacing(1)
  }
}));

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { addToCart } = cartActions;
  const products = useAppSelector(selectProducts);
  const [favorite, setFavorite] = useState(false);

  return (
    <div className={classes.root} key={product._id}>
      <figure onClick={() => history.push(`/product/${product._id}`)}>
        <img src={product.images && product.images[0].url} alt="" />
      </figure>
      <Typography
        onClick={() => history.push(`/product/${product._id}`)}
        className={classes.name}
        variant="subtitle2"
      >
        {product.name}
      </Typography>
      <Box display="flex" justifyContent="left" alignItems="center">
        <AttachMoneyIcon style={{ color: 'green' }} />
        <Typography className={classes.price} color="secondary" variant="h5">
          {formatNumber(product.price)}
        </Typography>
      </Box>
      <Box
        className={classes.star}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <StarIcon style={{ color: 'orange' }} />
          <Typography variant="subtitle2" style={{ paddingTop: 4 }}>
            3.5 <small>(33)</small>
          </Typography>
        </Box>
        <Tooltip TransitionComponent={Zoom} arrow title="Add to wishlist" placement="top">
          {favorite ? (
            <FavoriteIcon
              onClick={() => setFavorite(false)}
              style={{ cursor: 'pointer', color: 'red' }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => setFavorite(true)}
              style={{ cursor: 'pointer', color: 'red' }}
            />
          )}
        </Tooltip>
      </Box>
      <Box className={classes.action} display="flex" justifyContent="left" alignItems="center">
        {product.inCart ? (
          <Button variant="contained" disabled text="In Cart" />
        ) : (
          <Button
            className={classes.addToCart}
            onClick={() => dispatch(addToCart({ product, products, inCart: true }))}
            text="Add To Cart"
          />
        )}
        <Typography variant="subtitle2">
          Đã bán{' '}
          <small>
            <b>({product.sold})</b>
          </small>
        </Typography>
      </Box>
    </div>
  );
};

export default ProductItem;
