import { Box, Typography, makeStyles, Tooltip, Zoom, CircularProgress } from '@material-ui/core';
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
import { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from 'redux/features/auth/slice';
import { addWishlistApi, removeWishlistApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import clsx from 'clsx';
import { uiActions } from 'redux/features/ui/slice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    maxWidth: 227,
    padding: 10,
    borderRadius: 5,
    minHeight: 370,
    border: `1px solid ${theme.palette.primary.dark}`,
    position: 'relative',
    '& figure': {
      width: '90%',
      textAlign: 'center',
      margin: '0 auto',
      minHeight: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
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
    padding: '3px 0',
    cursor: 'pointer',
    textDecorationColor: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      textUnderlineOffset: '2px'
    }
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
  },
  wishlist: {
    cursor: 'pointer',
    color: 'red'
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'default !important'
  }
}));

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { addToCart } = cartActions;
  const { showSnackbar } = uiActions;
  const products = useAppSelector(selectProducts);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddWishlist = async () => {
    if (isLoggedIn) {
      setLoading(true);
      await addWishlistApi(ENDPOINTS.users.getOne, { productId: product?._id!, user: user! });
      setLoading(false);
      setFavorite(true);
    } else {
      dispatch(
        showSnackbar({
          status: 'warning',
          message: 'You must be logged in to perform this function'
        })
      );
    }
  };

  const handleRemoveWishlist = async () => {
    if (isLoggedIn) {
      setLoading(true);
      await removeWishlistApi(ENDPOINTS.users.getOne, { productId: product?._id!, user: user! });
      setLoading(false);
      setFavorite(false);
    } else {
      dispatch(
        showSnackbar({
          status: 'warning',
          message: 'You must be logged in to perform this function'
        })
      );
    }
  };

  useEffect(() => {
    if (user?._id) {
      setFavorite(user.wishlist.some((value) => value === product._id));
    }
  }, [user]);

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
        <Box display="flex" justifyContent="center" alignItems="center" style={{ columnGap: 10 }}>
          {loading && <CircularProgress size={20} />}
          <Tooltip
            TransitionComponent={Zoom}
            arrow
            title={`${favorite ? 'Remove from wishlist' : 'Add to wishlist'}`}
            placement="top"
          >
            {favorite ? (
              <FavoriteIcon
                onClick={handleRemoveWishlist}
                className={clsx(classes.wishlist, {
                  [classes.disabled]: loading
                })}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleAddWishlist}
                className={clsx(classes.wishlist, {
                  [classes.disabled]: loading
                })}
              />
            )}
          </Tooltip>
        </Box>
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
          Sold{' '}
          <small>
            <b>({product.sold})</b>
          </small>
        </Typography>
      </Box>
    </div>
  );
};

export default ProductItem;
