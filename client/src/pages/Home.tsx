import { useEffect } from 'react';
import { Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Cart from 'components/cart';
import Layout from 'components/layouts';
import {
  productActions,
  selectProducts,
  selectProductsLaptop,
  selectProductsPhone,
  selectProductsTablet,
  selectProductsWatch
} from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Button } from 'components/UI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import {
  categoryActions,
  selectCategories,
  selectCategoriesLaptop,
  selectCategoriesPhone,
  selectCategoriesTablet,
  selectCategoriesWatch
} from 'redux/features/category/slice';
import ProductItem from './product/ProductItem';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(6)
  },
  swiperBannerTop: {
    marginTop: 70
  },
  swiperSmall: {
    margin: '15px 0',
    '& img': {
      width: '100%',
      borderRadius: 10
    }
  },
  listCategory: {
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(2),
    columnGap: 10,
    width: '100%',
    margin: '15px 0',
    borderRadius: 8,
    marginTop: theme.spacing(6),
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
    padding: `${theme.spacing(1.5)}px`
  },
  viewAll: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    padding: '10px 20px',
    borderRadius: 20,
    fontWeight: 700,
    marginTop: theme.spacing(2),
    '&:hover': {
      color: 'white'
    }
  },
  listProduct: {
    padding: theme.spacing(2),
    columnGap: 10
  }
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const productsPhone = useAppSelector(selectProductsPhone);
  const productsLaptop = useAppSelector(selectProductsLaptop);
  const productsTablet = useAppSelector(selectProductsTablet);
  const productsWatch = useAppSelector(selectProductsWatch);
  const categoriesPhone = useAppSelector(selectCategoriesPhone);
  const categoriesLaptop = useAppSelector(selectCategoriesLaptop);
  const categoriesTablet = useAppSelector(selectCategoriesTablet);
  const categoriesWatch = useAppSelector(selectCategoriesWatch);
  const { getProducts, getProductsPhone, getProductsLaptop, getProductsTablet, getProductsWatch } =
    productActions;
  const { getCategoriesPhone, getCategoriesLaptop, getCategoriesTablet, getCategoriesWatch } =
    categoryActions;

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
              onClick={() => dispatch(getProductsPhone(cat._id || ''))}
              style={{ fontWeight: 700 }}
            >
              {cat.name}
            </Typography>
          ))}
        </Box>
        <Box className={classes.box}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            width={1175}
            slidesPerView={5}
            spaceBetween={10}
          >
            {productsPhone?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box display="flex" justifyContent="center">
            <Button className={classes.viewAll} text="View all products" />
          </Box>
        </Box>
      </>
    );
  };

  const renderCategoriesLaptop = () => {
    return (
      <>
        <Box
          className={classes.listCategory}
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          <Typography className={classes.listTitle}>{categoriesLaptop?.name}</Typography>
          {categoriesLaptop?.children?.map((cat) => (
            <Typography
              key={cat._id}
              onClick={() => dispatch(getProductsLaptop(cat._id || ''))}
              style={{ fontWeight: 700 }}
            >
              {cat.name}
            </Typography>
          ))}
        </Box>
        <Box className={classes.box}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            width={1175}
            slidesPerView={5}
            spaceBetween={10}
          >
            {productsLaptop?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box display="flex" justifyContent="center">
            <Button className={classes.viewAll} text="View all products" />
          </Box>
        </Box>
      </>
    );
  };

  const renderCategoriesTablet = () => {
    return (
      <>
        <Box
          className={classes.listCategory}
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          <Typography className={classes.listTitle}>{categoriesTablet?.name}</Typography>
          {categoriesTablet?.children?.map((cat) => (
            <Typography
              key={cat._id}
              onClick={() => dispatch(getProductsTablet(cat._id || ''))}
              style={{ fontWeight: 700 }}
            >
              {cat.name}
            </Typography>
          ))}
        </Box>
        <Box className={classes.box}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            width={1175}
            slidesPerView={5}
            spaceBetween={10}
          >
            {productsTablet?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box display="flex" justifyContent="center">
            <Button className={classes.viewAll} text="View all products" />
          </Box>
        </Box>
      </>
    );
  };

  const renderCategoriesWatch = () => {
    return (
      <>
        <Box
          className={classes.listCategory}
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          <Typography className={classes.listTitle}>{categoriesWatch?.name}</Typography>
          {categoriesWatch?.children?.map((cat) => (
            <Typography
              key={cat._id}
              onClick={() => dispatch(getProductsWatch(cat._id || ''))}
              style={{ fontWeight: 700 }}
            >
              {cat.name}
            </Typography>
          ))}
        </Box>
        <Box className={classes.box}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            width={1175}
            slidesPerView={5}
            spaceBetween={10}
          >
            {productsWatch?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box display="flex" justifyContent="center">
            <Button className={classes.viewAll} text="View all products" />
          </Box>
        </Box>
      </>
    );
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (categoriesPhone?.children) {
      dispatch(getProductsPhone(categoriesPhone.children[0]._id || ''));
    }

    if (categoriesLaptop?.children) {
      dispatch(getProductsLaptop(categoriesLaptop.children[0]._id || ''));
    }

    if (categoriesTablet?.children) {
      dispatch(getProductsTablet(categoriesTablet.children[0]._id || ''));
    }

    if (categoriesWatch?.children) {
      dispatch(getProductsWatch(categoriesWatch.children[0]._id || ''));
    }
  }, [products]);

  useEffect(() => {
    dispatch(getCategoriesPhone());
    dispatch(getCategoriesLaptop());
    dispatch(getCategoriesTablet());
    dispatch(getCategoriesWatch());
  }, [categories]);

  return (
    <Layout>
      <Toolbar />
      <Cart />
      <div className={classes.root}>
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
        {renderCategoriesLaptop()}
        {renderCategoriesTablet()}
        {renderCategoriesWatch()}
      </div>
    </Layout>
  );
};

export default Home;
