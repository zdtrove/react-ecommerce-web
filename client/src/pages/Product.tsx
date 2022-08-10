import {
  Box,
  CircularProgress,
  DialogContent,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom
} from '@material-ui/core';
import Layout from 'components/layouts';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectProducts, selectLoadingRating, productActions } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { formatNumber, imageShow } from 'utils/functions';
import ProductItem from 'components/product/ProductItem';
import StarIcon from '@material-ui/icons/Star';
import { Button, Dialog, Input } from 'components/UI';
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
import { ListRated, Product, StarByNumber } from 'types/product';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
    paddingBottom: theme.spacing(6),
    '& .MuiFormHelperText-contained': {
      marginLeft: 0
    }
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
    columnGap: theme.spacing(2)
  },
  detail: {
    '& .MuiTypography-root': {
      lineHeight: 1.6
    }
  },
  related: {
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(1.5)}px`,
    marginTop: theme.spacing(6),
    '& .swiper-button-disabled': {
      pointerEvents: 'initial'
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
    marginTop: theme.spacing(2)
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
    width: 290,
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
    marginTop: theme.spacing(2),
    '& .MuiRating-label': {
      width: 88,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& .MuiSvgIcon-fontSizeInherit': {
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
  },
  viewAllRated: {
    marginLeft: 10,
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'blue',
    '&:hover': {
      textDecoration: 'underline',
      textUnderlineOffset: '2px'
    }
  },
  listRated: {},
  dialogRated: {
    padding: '0 !important'
  },
  upload: {
    marginTop: theme.spacing(2),
    '& #upload': {
      display: 'none'
    }
  },
  imageList: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 15,
    rowGap: 15,
    flexWrap: 'wrap',
    padding: 10,
    marginTop: 10
  },
  imageItem: {
    position: 'relative',
    maxWidth: 100,
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
  }
}));

const ProductPage = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectProducts);
  const loadingRating = useAppSelector(selectLoadingRating);
  const { addToCart } = cartActions;
  const { showSnackbar } = uiActions;
  const { rating } = productActions;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [rated, setRated] = useState<number | null>(0);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [productsRelated, setProductsRelated] = useState<Product[]>([]);
  const [starByNumber, setStarByNumber] = useState<StarByNumber>({} as StarByNumber);
  const [show, setShow] = useState(false);
  const [imagesNew, setImagesChange] = useState<any[]>([]);
  const [imagesOld, setImagesOld] = useState<any[]>([]);

  const validationSchema = Yup.object().shape({
    star: Yup.number().required('Rating is required'),
    message: Yup.string().required('Message is required').max(1000, 'Message max length is 1000')
  });

  let initialValues: ListRated = {
    star: 0,
    message: '',
    userId: '',
    userName: '',
    images: [],
    date: new Date(),
    imagesOld: [],
    imagesNew: []
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (isLoggedIn) {
        dispatch(
          rating({
            productId: product?._id!,
            starNumber: values.star,
            userId: user?._id!,
            userName: user?.fullName!,
            date: values.date,
            message: values.message,
            imagesOld,
            imagesNew
          })
        );
      } else {
        dispatch(
          showSnackbar({
            status: 'warning',
            message: 'You must be logged in to perform this function'
          })
        );
      }
    }
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let err = '';
    let imagesNewChoose: any[] = [];
    files.forEach((file) => {
      if (!file) return (err = 'File does not exist');
      if (file.size > 1024 * 1024 * 2) {
        return (err = 'The image largest is 2mb');
      }
      return imagesNewChoose.push(file);
    });
    if (err) console.log(err);
    setImagesChange([...imagesNew, ...imagesNewChoose]);
    formIk.setFieldValue('imagesNew', [...imagesNew, ...imagesNewChoose]);
    formIk.setFieldValue('imagesOld', imagesOld);
  };

  const deleteNewImages = (index: number) => {
    const imagesNewChoose = [...imagesNew];
    imagesNewChoose.splice(index, 1);
    setImagesChange(imagesNewChoose);
    formIk.setFieldValue('imagesNew', imagesNewChoose);
  };

  const deleteOldImages = (index: number) => {
    const imagesNewChoose = [...imagesOld];
    imagesNewChoose.splice(index, 1);
    setImagesOld(imagesNewChoose);
    formIk.setFieldValue('imagesOld', imagesNewChoose);
  };

  const handleAddWishlist = async () => {
    if (isLoggedIn) {
      setLoading(true);
      await addWishlistApi(ENDPOINTS.users.getOne, { productId: product?._id!, user: user! });
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

  const handleLightBox = (image: string) => {
    setOpenLightBox(true);
    setCurrentImage(image);
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
          {product?.star?.average.toFixed(1)}
        </Typography>
        {average >= 1 ? <StarIcon /> : <StarOutlineIcon />}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
        <Tooltip
          TransitionComponent={Zoom}
          arrow
          title="View all rated"
          placement="top"
          onClick={() => setShow(true)}
        >
          <Typography className={classes.viewAllRated}>
            {product?.star?.list?.length} Rated
          </Typography>
        </Tooltip>
      </Box>
    );
  };

  const renderStarPercent = (starNumber: number, percent: number, value: number) => {
    return (
      <Box className={classes.line} display="flex" alignItems="center">
        <Typography style={{ width: 10 }}>{starNumber}</Typography>
        <Box style={{ marginLeft: 5, width: 100 }} display="flex" alignItems="center">
          {starNumber >= 1 ? <StarIcon /> : <StarOutlineIcon />}
          {starNumber >= 2 ? <StarIcon /> : <StarOutlineIcon />}
          {starNumber >= 3 ? <StarIcon /> : <StarOutlineIcon />}
          {starNumber >= 4 ? <StarIcon /> : <StarOutlineIcon />}
          {starNumber >= 5 ? <StarIcon /> : <StarOutlineIcon />}
        </Box>
        <div className={classes.percent}>
          <p style={{ width: `${percent || 0}%`, transition: 'width 1s' }} />
        </div>
        <Typography>
          <span style={{ display: 'flex' }}>
            <small style={{ fontWeight: 700 }}>{value || 0}</small>
            <small style={{ marginLeft: 5 }}>rated</small>
          </span>
        </Typography>
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
      <form onSubmit={formIk.handleSubmit}>
        <Box className={classes.rated}>
          <Typography style={{ fontWeight: 700 }} variant="h5">
            Rated:
          </Typography>
          <Box style={{ border: '1px dashed orange', padding: 10, borderRadius: 8 }}>
            <Rating
              {...formIk.getFieldProps('star')}
              value={rated}
              onChange={(event, value) => {
                setRated(value);
                formIk.setFieldValue('star', value);
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
          <div className={classes.upload}>
            <label htmlFor="upload">
              <input
                id="upload"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleChangeImage}
              />
              <Fab
                color="secondary"
                variant="extended"
                size={matches ? 'medium' : 'small'}
                component="span"
              >
                <AddIcon /> Add images
              </Fab>
            </label>
          </div>
          <div className={classes.imageList}>
            {imagesOld &&
              imagesOld.map((img, index) => (
                <div className={classes.imageItem} key={index}>
                  {imageShow(img.url)}
                  <span onClick={() => deleteOldImages(index)}>
                    <HighlightOffIcon />
                  </span>
                </div>
              ))}
            {imagesNew &&
              imagesNew.map((img, index) => (
                <div className={classes.imageItem} key={index}>
                  {imageShow(URL.createObjectURL(img))}
                  <span onClick={() => deleteNewImages(index)}>
                    <HighlightOffIcon />
                  </span>
                </div>
              ))}
          </div>
          <Input
            label="Message"
            {...formIk.getFieldProps('message')}
            error={formIk.touched.message && formIk.errors.message}
            multiline
            minRows={4}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 10 }}>
          <Button
            disabled={!(formIk.isValid && formIk.dirty) || loadingRating}
            onClick={() => formIk.submitForm()}
            text="Send rated"
            style={{ marginRight: 10 }}
          />
          {loadingRating && <CircularProgress size={25} style={{ color: 'green' }} />}
        </Box>
      </form>
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" justifyContent="left" alignItems="center">
            <AttachMoneyIcon style={{ color: 'green' }} />
            <Typography variant="h5" color="secondary" style={{ fontWeight: 700 }}>
              {product?.price && formatNumber(product?.price)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="right" alignItems="center" style={{ columnGap: 10 }}>
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
        products.filter(
          (prod) => prod.categoryId === product.categoryId && prod._id !== product?._id
        )
      );
    }
    if (product?.star?.list.length) {
      const myRated: ListRated[] = product?.star?.list.filter((item) => item.userId === user?._id);
      if (myRated.length) {
        setRated(myRated[0].star);
        setImagesOld(myRated[0]?.images!);
        formIk.setFieldValue('star', myRated[0].star);
        formIk.setFieldValue('message', myRated[0].message);
      }
      const listStar = product?.star?.list;
      setStarByNumber({
        one: calculatePercent(listStar, 1),
        two: calculatePercent(listStar, 2),
        three: calculatePercent(listStar, 3),
        four: calculatePercent(listStar, 4),
        five: calculatePercent(listStar, 5)
      });
    } else {
      setRated(0);
      setImagesOld([]);
      formIk.setFieldValue('star', 0);
      formIk.setFieldValue('message', '');
      setStarByNumber({
        one: { value: 0, percent: 0 },
        two: { value: 0, percent: 0 },
        three: { value: 0, percent: 0 },
        four: { value: 0, percent: 0 },
        five: { value: 0, percent: 0 }
      });
    }
  }, [product]);

  useEffect(() => {
    const productTemp = products.filter((product) => product._id === id);
    setProduct(productTemp[0]);
  }, [id, products]);

  useEffect(() => {
    if (!isLoggedIn) {
      setRated(0);
      setImagesOld([]);
      formIk.setFieldValue('star', 0);
      formIk.setFieldValue('message', '');
    }
  }, [isLoggedIn]);

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
      <Dialog show={show} setShow={setShow} title="LIST RATED">
        <DialogContent className={classes.dialogRated}>
          {product?.star?.list.length > 0 &&
            product.star.list.map((rated, index) => (
              <Fragment key={rated.userId}>
                <List dense className={classes.listRated}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6">
                            <p style={{ fontWeight: 700, margin: 0, lineHeight: '10px' }}>
                              {rated.userName}
                            </p>
                            <small style={{ fontSize: 12 }}>
                              {moment(rated.date).format('DD/MM/YYYY - HH:mm:ss')}
                            </small>
                          </Typography>
                          <Box className={classes.average} display="flex" alignItems="center">
                            {rated.star >= 1 ? <StarIcon /> : <StarOutlineIcon />}
                            {rated.star >= 2 ? <StarIcon /> : <StarOutlineIcon />}
                            {rated.star >= 3 ? <StarIcon /> : <StarOutlineIcon />}
                            {rated.star >= 4 ? <StarIcon /> : <StarOutlineIcon />}
                            {rated.star >= 5 ? <StarIcon /> : <StarOutlineIcon />}
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography>{rated.message}</Typography>
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
                                  style={{ width: '25%', maxWidth: '100%', cursor: 'pointer' }}
                                >
                                  {imageShow(img.url)}
                                </div>
                              ))}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
                {index + 1 !== product.star.list.length && <Divider />}
              </Fragment>
            ))}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ProductPage;
