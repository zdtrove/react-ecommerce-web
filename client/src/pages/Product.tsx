import {
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
  Zoom
} from '@material-ui/core';
import Layout from 'components/layouts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  productActions,
  selectProduct,
  selectProducts,
  selectProductsRelated
} from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { formatNumber } from 'utils/functions';
import ProductItem from 'components/product/ProductItem';
import StarIcon from '@material-ui/icons/Star';
import { Button } from 'components/UI';
import { cartActions } from 'redux/features/cart/slice';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from '@material-ui/lab';
import { uiActions } from 'redux/features/ui/slice';
import { ENDPOINTS } from 'constants/index';
import { addWishlistApi, removeWishlistApi } from 'apis/commonApi';
import { selectIsLoggedIn, selectUser } from 'redux/features/auth/slice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
    paddingBottom: theme.spacing(6)
  },
  gallery: {
    height: 600,
    width: 700,
    marginTop: 10,
    '& .swiper': {
      width: '100%',
      height: 300,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    '& .swiper-slide': {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '& img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer'
      }
    },
    '& .mySwiper': {
      height: '80%',
      width: '100%'
    },
    '& .mySwiperThumb': {
      height: '20%',
      boxSizing: 'border-box',
      padding: '10px 0',
      '& .swiper-slide': {
        width: '25%',
        height: '100%',
        opacity: 0.4
      },
      '& .swiper-slide-thumb-active': {
        opacity: 1
      }
    },
    '& .swiper-button-disabled': {
      pointerEvents: 'initial'
    }
  },
  lightBox: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999
  },
  hidden: {
    visibility: 'hidden'
  },
  closeLightBox: {
    position: 'absolute',
    top: 25,
    right: 25,
    color: 'white',
    backgroundColor: '#ddd6',
    '&:hover': {
      backgroundColor: '#9e9e9e'
    }
  },
  detailContainer: {
    columnGap: theme.spacing(4)
  },
  detail: {
    '& .MuiTypography-root': {
      lineHeight: 1.6
    }
  },
  related: {
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(1.5)}px`,
    marginTop: theme.spacing(6)
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
    marginTop: theme.spacing(1),
    columnGap: theme.spacing(1)
  },
  ratedResult: {
    marginTop: theme.spacing(5)
  },
  average: {
    marginBottom: theme.spacing(0.75),
    '& .MuiSvgIcon-root': {
      color: 'orange',
      width: 30,
      height: 'auto'
    }
  },
  line: {
    '& .MuiTypography-root': {
      fontWeight: 700
    },
    '& .MuiSvgIcon-root': {
      color: 'orange',
      width: 20,
      height: 'auto'
    }
  },
  percent: {
    width: 300,
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    '& p': {
      height: 8,
      backgroundColor: 'orange',
      margin: 0,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10
    }
  },
  rated: {
    marginTop: theme.spacing(8),
    '& .MuiRating-label': {
      width: 88,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& .MuiSvgIcon-root': {
      width: 50,
      height: 'auto'
    }
  },
  ratedText: {
    '& .MuiTypography-root': {
      width: 88,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 700,
      textAlign: 'center'
    }
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

const ProductPage = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const product = useAppSelector(selectProduct);
  const products = useAppSelector(selectProducts);
  const productsRelated = useAppSelector(selectProductsRelated);
  const { getProductById, getProducts, getProductsRelated } = productActions;
  const { addToCart } = cartActions;
  const { showSnackbar } = uiActions;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [value, setValue] = useState<number | null>(0);
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

  const handleLightBox = (image: string) => {
    setOpenLightBox(true);
    setCurrentImage(image);
  };

  useEffect(() => {
    if (user?._id) {
      setFavorite(user.wishlist.some((value) => value === product?._id));
    }
  }, [user, product]);

  useEffect(() => {
    if (product?.images) {
      const images: string[] = [];
      product?.images.forEach((item, index) => index && images.push(item.url));
      setImages(images);
    }
    if (product?.categoryId) {
      dispatch(getProductsRelated(product));
    }
  }, [product]);

  useEffect(() => {
    dispatch(getProductById(id));
    if (product?.categoryId) {
      dispatch(getProductsRelated(product));
    }
  }, [id, products]);

  useEffect(() => {
    !products.length && dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <Toolbar />
      <Box className={classes.root}>
        <Box className={classes.detailContainer} display="flex">
          <Box className={classes.gallery}>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {images.length > 0 &&
                images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img onClick={() => handleLightBox(image)} src={image} alt="image" />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiperThumb"
            >
              {images.length > 0 &&
                images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt="image" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
          <Box className={classes.detail}>
            <Typography variant="h5" style={{ fontWeight: 700 }}>
              {product?.name}
            </Typography>
            <Box display="flex" justifyContent="left" alignItems="center">
              <AttachMoneyIcon style={{ color: 'green' }} />
              <Typography variant="h5" color="secondary" style={{ fontWeight: 700 }}>
                {product?.price && formatNumber(product?.price)}
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ columnGap: 10 }}
              >
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
            <Box
              className={classes.action}
              display="flex"
              justifyContent="left"
              alignItems="center"
            >
              {product?.inCart ? (
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
                  <b>({product?.sold})</b>
                </small>
              </Typography>
            </Box>
            <Box className={classes.ratedResult}>
              <Box className={classes.average} display="flex" alignItems="center">
                <Typography variant="h5" style={{ color: 'orange', marginRight: 10 }}>
                  3.5
                </Typography>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
                <Typography style={{ marginLeft: 10, fontWeight: 'bold' }}>33 Rated</Typography>
              </Box>
              <Box className={classes.line} display="flex" alignItems="center">
                <Typography style={{ width: 10 }}>5</Typography>
                <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </Box>
                <div className={classes.percent}>
                  <p style={{ width: '40%' }} />
                </div>
                <Typography>35</Typography>
              </Box>
              <Box className={classes.line} display="flex" alignItems="center">
                <Typography style={{ width: 10 }}>4</Typography>
                <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarOutlineIcon />
                </Box>
                <div className={classes.percent}>
                  <p style={{ width: '60%' }} />
                </div>
                <Typography>44</Typography>
              </Box>
              <Box className={classes.line} display="flex" alignItems="center">
                <Typography style={{ width: 10 }}>3</Typography>
                <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                </Box>
                <div className={classes.percent}>
                  <p style={{ width: '10%' }} />
                </div>
                <Typography>7</Typography>
              </Box>
              <Box className={classes.line} display="flex" alignItems="center">
                <Typography style={{ width: 10 }}>2</Typography>
                <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
                  <StarIcon />
                  <StarIcon />
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                </Box>
                <div className={classes.percent}>
                  <p style={{ width: '30%' }} />
                </div>
                <Typography>21</Typography>
              </Box>
              <Box className={classes.line} display="flex" alignItems="center">
                <Typography style={{ width: 10 }}>1</Typography>
                <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
                  <StarIcon />
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                </Box>
                <div className={classes.percent}>
                  <p style={{ width: '10%' }} />
                </div>
                <Typography>7</Typography>
              </Box>
            </Box>
            <Box className={classes.rated}>
              <Typography style={{ fontWeight: 700 }} variant="h5">
                Rated:
              </Typography>
              <Box style={{ border: '1px dashed orange', padding: 10, borderRadius: 8 }}>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <Box display="flex" alignItems="center" className={classes.ratedText}>
                  <Typography>Very bad</Typography>
                  <Typography>Bad</Typography>
                  <Typography>Normal</Typography>
                  <Typography>Good</Typography>
                  <Typography>Very good</Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" style={{ marginTop: 10 }}>
              <Button
                onClick={() =>
                  dispatch(showSnackbar({ status: 'warning', message: 'Under construction' }))
                }
                text="Send rated"
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.related}>
          <Typography variant="h5" style={{ marginBottom: 10, color: 'white', fontWeight: 700 }}>
            Related products
          </Typography>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            width={1175}
            slidesPerView={5}
            spaceBetween={10}
          >
            {productsRelated?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        className={clsx(classes.lightBox, {
          [classes.hidden]: !openLightBox
        })}
      >
        <IconButton className={classes.closeLightBox} onClick={() => setOpenLightBox(false)}>
          <CloseIcon />
        </IconButton>
        <img src={currentImage} alt="image" />
      </Box>
    </Layout>
  );
};

export default ProductPage;
