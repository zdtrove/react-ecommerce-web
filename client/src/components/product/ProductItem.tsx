import { Box, Typography, makeStyles, Tooltip, Zoom, CircularProgress } from '@material-ui/core';
import { Product } from 'types/product';
import { formatNumber } from 'utils/functions';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Button } from 'components/UI';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { cartActions } from 'redux/features/cart/slice';
import { selectProducts } from 'redux/features/product/slice';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser, selectWishlist } from 'redux/features/auth/slice';
import { addWishlistApi, removeWishlistApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import clsx from 'clsx';
import { uiActions } from 'redux/features/ui/slice';
import { authActions } from 'redux/features/auth/slice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    maxWidth: 230,
    padding: 8,
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
      padding: '3px 0'
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
  },
  average: {
    '& .MuiSvgIcon-root': {
      color: 'orange',
      width: 20,
      height: 'auto',
      marginRight: 0
    }
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
  const wishlist = useAppSelector(selectWishlist);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { addToCart } = cartActions;
  const { showSnackbar } = uiActions;
  const { addToWishlist, removeFromWishlist } = authActions;
  const products = useAppSelector(selectProducts);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddWishlist = async () => {
    if (isLoggedIn) {
      setLoading(true);
      await addWishlistApi(ENDPOINTS.users.getOne, { productId: product?._id!, user: user! });
      dispatch(addToWishlist(product?._id!));
      setFavorite(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
      dispatch(removeFromWishlist(product?._id!));
      setFavorite(false);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      dispatch(
        showSnackbar({
          status: 'warning',
          message: 'You must be logged in to perform this function'
        })
      );
    }
  };

  const renderStar = (star: number) => {
    const average = product?.star?.average!;
    return average >= star ? (
      <StarIcon />
    ) : average > star - 1 && average < star ? (
      <StarHalfIcon />
    ) : (
      <StarOutlineIcon />
    );
  };

  const renderRatedAverage = () => {
    const average = product?.star?.average!;
    return (
      <Box className={classes.average} display="flex" alignItems="center">
        <Typography variant="subtitle2" style={{ color: 'orange', marginRight: 5 }}>
          {product?.star?.average.toFixed(1)}
        </Typography>
        {average >= 1 ? <StarIcon /> : <StarOutlineIcon />}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
        <Typography style={{ marginLeft: 5, fontWeight: 'bold' }}>
          <small>({product?.star?.list?.length})</small>
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    if (wishlist.length) {
      setFavorite(wishlist.some((value) => value === product._id));
    }
  }, [wishlist]);

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
        {renderRatedAverage()}
        <Box display="flex" justifyContent="center" alignItems="center" style={{ columnGap: 8 }}>
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
