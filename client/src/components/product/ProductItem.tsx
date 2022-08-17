import {
  Box,
  Typography,
  makeStyles,
  Tooltip,
  Zoom,
  CircularProgress,
  DialogContent,
  List,
  Divider,
  Button
} from '@material-ui/core';
import { Product } from 'types/product';
import { formatNumber } from 'utils/functions';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Dialog } from 'components/UI';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { cartActions } from 'redux/features/cart/slice';
import { selectProducts } from 'redux/features/product/slice';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Fragment, useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser, selectWishlist } from 'redux/features/auth/slice';
import { addWishlistApi, removeWishlistApi } from 'apis/commonApi';
import { ENDPOINTS } from 'constants/index';
import clsx from 'clsx';
import { uiActions } from 'redux/features/ui/slice';
import { authActions } from 'redux/features/auth/slice';
import moment from 'moment';

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
      height: 195,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '& img': {
        width: '100%',
        transition: 'all 200ms ease-in-out',
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
    textDecorationColor: `${theme.palette.primary.main} !important`,
    height: 50,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  },
  dialogRated: {
    padding: '0 !important'
  },
  listRated: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
  },
  viewAllRated: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'blue',
    cursor: 'pointer'
  },
  imageItem: {
    position: 'relative',
    maxWidth: 100,
    cursor: 'pointer',
    '& img': {
      border: '1px solid #ddd',
      padding: 10,
      width: '100%'
    },
    '& span': {
      position: 'absolute',
      top: -10,
      right: -10,
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    '& span:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  hoverDetail: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    overflowY: 'scroll',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all .5s ease',
    zIndex: 1,
    display: 'none'
  },
  mainImage: {
    '&:hover .hover-detail': {
      opacity: 1,
      visibility: 'visible'
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
  const { showSnackbar, showLightBox, setLightBoxImage, setLightBoxImageList } = uiActions;
  const { addToWishlist, removeFromWishlist } = authActions;
  const {
    _id,
    images,
    name,
    price,
    star: { list },
    inCart,
    sold
  } = product;
  const products = useAppSelector(selectProducts);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

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
        <Typography variant="subtitle2" style={{ color: 'orange', marginRight: 5, marginTop: 3 }}>
          {product?.star?.average.toFixed(1)}
        </Typography>
        {average >= 1 ? <StarIcon /> : <StarOutlineIcon />}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
        {list.length ? (
          <Tooltip
            onClick={() => setShow(true)}
            TransitionComponent={Zoom}
            arrow
            title="View all rated"
            placement="top"
          >
            <Typography className={classes.viewAllRated}>
              <small>({product?.star?.list?.length})</small>
            </Typography>
          </Tooltip>
        ) : (
          <Typography style={{ marginLeft: 5 }}>
            <small>({product?.star?.list?.length})</small>
          </Typography>
        )}
      </Box>
    );
  };

  useEffect(() => {
    if (wishlist.length) {
      setFavorite(wishlist.some((value) => value === _id));
    }
  }, [wishlist]);

  return (
    <div className={classes.root}>
      <Box className={classes.mainImage}>
        <figure onClick={() => history.push(`/product/${_id}`)}>
          <img src={images && images[0].url} alt="" />
        </figure>
        <Box className={`${classes.hoverDetail} hover-detail`}>
          <Box style={{ padding: 10 }}>
            <Typography variant="h6">{product?.name}</Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        onClick={() => history.push(`/product/${_id}`)}
        className={classes.name}
        variant="subtitle2"
      >
        {name}
      </Typography>
      <Box display="flex" justifyContent="left" alignItems="center">
        <AttachMoneyIcon style={{ color: 'green', marginLeft: -5 }} />
        <Typography className={classes.price} color="secondary" variant="h5">
          {formatNumber(price)}
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
        {inCart ? (
          <Button variant="contained" style={{ textTransform: 'none' }} disabled>
            <small>In Cart</small>
          </Button>
        ) : (
          <Button
            className={classes.addToCart}
            variant="contained"
            color="primary"
            onClick={() => dispatch(addToCart({ product, products, inCart: true }))}
            style={{ textTransform: 'none' }}
          >
            <small>Add To Cart</small>
          </Button>
        )}
        <Typography variant="subtitle2">
          <small>Sold</small>{' '}
          <small>
            <b>({sold})</b>
          </small>
        </Typography>
      </Box>
      <Dialog show={show} setShow={setShow} title={product?.name}>
        <DialogContent className={classes.dialogRated}>
          {list.length > 0 &&
            list.map((rated, index) => (
              <Fragment key={rated.userId}>
                <List dense className={classes.listRated}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography
                        variant="h6"
                        style={{ fontWeight: 700, margin: 0, lineHeight: '10px' }}
                      >
                        {rated.userName}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 12,
                          marginTop: 10,
                          marginBottom: 10,
                          fontWeight: 700,
                          fontStyle: 'italic'
                        }}
                      >
                        {moment(rated.date).format('DD/MM/YYYY - HH:mm:ss')}
                      </Typography>
                    </Box>
                    <Box className={classes.average} display="flex" alignItems="center">
                      {rated.star >= 1 ? <StarIcon /> : <StarOutlineIcon />}
                      {rated.star >= 2 ? <StarIcon /> : <StarOutlineIcon />}
                      {rated.star >= 3 ? <StarIcon /> : <StarOutlineIcon />}
                      {rated.star >= 4 ? <StarIcon /> : <StarOutlineIcon />}
                      {rated.star >= 5 ? <StarIcon /> : <StarOutlineIcon />}
                    </Box>
                  </Box>
                  <span>{rated.message}</span>
                  <Box
                    display="flex"
                    alignItems="initial"
                    style={{ columnGap: 5, flexWrap: 'wrap', marginTop: 10 }}
                  >
                    {rated?.images?.length! > 0 &&
                      rated?.images!.map((img, index) => (
                        <div
                          className={classes.imageItem}
                          key={index}
                          style={{ width: '24%', maxWidth: '100%', cursor: 'pointer' }}
                        >
                          <img
                            onClick={() => {
                              const listImages = rated?.images!.map((item) => item.url);
                              dispatch(setLightBoxImageList(listImages));
                              dispatch(setLightBoxImage(img.url));
                              dispatch(showLightBox());
                            }}
                            src={img.url}
                            alt="images"
                          />
                        </div>
                      ))}
                  </Box>
                </List>
                {index + 1 !== list.length && <Divider />}
              </Fragment>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
