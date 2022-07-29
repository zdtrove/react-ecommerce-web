import { useEffect } from 'react';
import { Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Cart from 'components/cart';
import Layout from 'components/layouts';
import { productActions, selectProductsPhone } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Button } from 'components/UI';
import { selectIsLoggedIn } from 'redux/features/auth/slice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { categoryActions, selectCategoriesPhone } from 'redux/features/category/slice';
import ProductItem from './product/ProductItem';

const useStyles = makeStyles((theme) => ({
  swiperBannerTop: {
    marginTop: 70
  },
  swiperSmall: {
    margin: '15px 0',
    '& img': {
      width: '100%',
      borderRadius: 10
    },
    '& .swiper-slide': {
      height: 155
    }
  },
  listCategory: {
    backgroundColor: theme.palette.primary.light,
    padding: 15,
    columnGap: 10,
    width: '100%',
    margin: '15px 0',
    '& .MuiTypography-root': {
      padding: '5px 10px',
      backgroundColor: 'white',
      borderRadius: 20,
      minWidth: 120,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  listTitle: {
    backgroundColor: 'transparent !important',
    fontWeight: 700,
    fontSize: 20,
    color: theme.palette.antiquewhite.main,
    textTransform: 'uppercase'
  },
  box: {
    backgroundColor: theme.palette.primary.light,
    padding: 10
  },
  viewAll: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    padding: '10px 20px',
    borderRadius: 20
  },
  listProduct: {
    padding: 15,
    columnGap: 10
  }
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const productsPhone = useAppSelector(selectProductsPhone);
  const categoriesPhone = useAppSelector(selectCategoriesPhone);
  const { getProducts, getProductByCategoryId } = productActions;
  const { getCategoriesPhone } = categoryActions;

  useEffect(() => {
    console.log('categoriesPhone?.children', categoriesPhone?.children);
    if (categoriesPhone?.children) {
      console.log('==================');
      dispatch(getProductByCategoryId(categoriesPhone.children[0]._id || ''));
    }
  }, [categoriesPhone]);

  const renderCategoriesPhone = () => {
    return (
      <>
        <Box
          className={classes.listCategory}
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          <Typography className={classes.listTitle}>{categoriesPhone?.name}</Typography>
          {categoriesPhone?.children?.map((cat) => (
            <Typography
              key={cat._id}
              onClick={() => dispatch(getProductByCategoryId(cat._id || ''))}
            >
              {cat.name}
            </Typography>
          ))}
        </Box>
        <Box className={classes.box}>
          <Box
            className={classes.listProduct}
            display="flex"
            justifyContent="left"
            alignItems="center"
          >
            {productsPhone?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </Box>
          <Box display="flex" justifyContent="center">
            <Button className={classes.viewAll} text="View all products" />
          </Box>
        </Box>
      </>
    );
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategoriesPhone());
  }, [isLoggedIn]);

  return (
    <Layout>
      <Toolbar />
      <Cart />
      <Swiper
        style={{ width: 1200 }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        width={1200}
        loop={true}
        className={classes.swiperBannerTop}
        autoplay={{
          delay: 3000
        }}
      >
        <SwiperSlide>
          <img src="/slider/slider-1.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-2.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-3.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-4.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-5.png" alt="slider" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        style={{ width: 1200 }}
        navigation={true}
        modules={[Navigation]}
        width={1200}
        loop={true}
        className={classes.swiperSmall}
        slidesPerView={3}
        spaceBetween={10}
        centeredSlides={true}
      >
        <SwiperSlide>
          <img src="/slider/slider-6.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-7.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-8.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-9.png" alt="slider" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/slider/slider-10.png" alt="slider" />
        </SwiperSlide>
      </Swiper>
      {renderCategoriesPhone()}
    </Layout>
  );
};

export default Home;
