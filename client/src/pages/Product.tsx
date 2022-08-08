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
import { selectProducts } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { formatNumber } from 'utils/functions';
import ProductItem from 'components/product/ProductItem';
import StarIcon from '@material-ui/icons/Star';
import { Button, Input } from 'components/UI';
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
import { addWishlistApi, removeWishlistApi, ratingProductApi } from 'apis/commonApi';
import { selectIsLoggedIn, selectUser } from 'redux/features/auth/slice';
import { ListRated, Product, StarByNumber } from 'types/product';

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
  const products = useAppSelector(selectProducts);
  const { addToCart } = cartActions;
  const { showSnackbar } = uiActions;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [rated, setRated] = useState<number | null>(0);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRating, setLoadingRating] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [productsRelated, setProductsRelated] = useState<Product[]>([]);
  const [message, setMessage] = useState('');
  const [starByNumber, setStarByNumber] = useState<StarByNumber>({} as StarByNumber);
  console.log('product', product);
  console.log('starByNumber', starByNumber);

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

  const handleRating = async () => {
    setLoadingRating(true);
    await ratingProductApi(ENDPOINTS.products.getOne, {
      productId: product?._id!,
      starNumber: rated!,
      userId: user?._id!,
      message
    });
    setLoadingRating(false);
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
        <Typography variant="h5" style={{ color: 'orange', marginRight: 10 }}>
          {product?.star?.average}
        </Typography>
        {average >= 1 ? <StarIcon /> : <StarOutlineIcon />}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
        <Typography style={{ marginLeft: 10, fontWeight: 'bold' }}>
          {product?.star?.list?.length} Rated
        </Typography>
      </Box>
    );
  };

  const renderStarPercent = (starNumber: number, percent: number, value: number) => {
    return (
      <Box className={classes.line} display="flex" alignItems="center">
        <Typography style={{ width: 10 }}>{starNumber}</Typography>
        <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Box>
        <div className={classes.percent}>
          <p style={{ width: `${percent || 0}%` }} />
        </div>
        <Typography>{value}</Typography>
      </Box>
    );
  };

  const calculatePercent = (listStar: ListRated[], starNumber: number) => {
    return {
      value: listStar.filter((item) => item.star === starNumber).length,
      percent: (listStar.filter((item) => item.star === starNumber).length / listStar.length) * 100
    };
  };

  const renderRated = () => {
    return (
      <>
        <Box className={classes.rated}>
          <Typography style={{ fontWeight: 700 }} variant="h5">
            Rated:
          </Typography>
          <Box style={{ border: '1px dashed orange', padding: 10, borderRadius: 8 }}>
            <Rating
              name="simple-controlled"
              value={rated}
              onChange={(event, value) => setRated(value)}
            />
            <Box display="flex" alignItems="center" className={classes.ratedText}>
              <Typography>Very bad</Typography>
              <Typography>Bad</Typography>
              <Typography>Normal</Typography>
              <Typography>Good</Typography>
              <Typography>Very good</Typography>
            </Box>
          </Box>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            minRows={4}
            label="Message"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 10, columnGap: 10 }}
        >
          <Button onClick={handleRating} text="Send rated" disabled={!(rated && message)} />
          {loadingRating && <CircularProgress size={25} style={{ color: 'green' }} />}
        </Box>
      </>
    );
  };

  const renderGallery = () => {
    return (
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
    );
  };

  const renderDetail = () => {
    return (
      <>
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
      </>
    );
  };

  const renderRelated = () => {
    return (
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
    );
  };

  const renderLightBox = () => {
    return (
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
    );
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
      setProductsRelated(
        products.filter((prt) => prt.categoryId === product.categoryId && prt._id !== product?._id)
      );
    }
    if (product?.star?.list.length) {
      const myRated = product?.star?.list.filter((item) => item.userId === user?._id);
      if (myRated.length) {
        setRated(myRated[0].star);
        setMessage(myRated[0].message);
      }
      const listStar = product?.star?.list;
      setStarByNumber({
        one: calculatePercent(listStar, 1),
        two: calculatePercent(listStar, 2),
        three: calculatePercent(listStar, 3),
        four: calculatePercent(listStar, 4),
        five: calculatePercent(listStar, 5)
      });
    }
  }, [product]);

  useEffect(() => {
    const productTemp = products.filter((product) => product._id === id);
    setProduct(productTemp[0]);
  }, [id, products]);

  return (
    <Layout>
      <Toolbar />
      <Box className={classes.root}>
        <Box className={classes.detailContainer} display="flex">
          {renderGallery()}
          <Box className={classes.detail}>
            {renderDetail()}
            <Box className={classes.ratedResult}>
              {renderRatedAverage()}
              {renderStarPercent(5, starByNumber?.five?.percent, starByNumber?.five?.value)}
              {renderStarPercent(4, starByNumber?.four?.percent, starByNumber?.four?.value)}
              {renderStarPercent(3, starByNumber?.three?.percent, starByNumber?.three?.value)}
              {renderStarPercent(2, starByNumber?.two?.percent, starByNumber?.two?.value)}
              {renderStarPercent(1, starByNumber?.one?.percent, starByNumber?.one?.value)}
            </Box>
            {renderRated()}
          </Box>
        </Box>
        {renderRelated()}
      </Box>
      {renderLightBox()}
    </Layout>
  );
};

export default ProductPage;
