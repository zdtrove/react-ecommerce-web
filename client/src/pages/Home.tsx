import { useEffect } from 'react';
import { Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Layout from 'components/layouts';
import {
  productActions,
  selectProducts,
  selectProductsLaptop,
  selectProductsPhone,
  selectProductsRefrigerator,
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
  selectCategoriesRefrigerator,
  selectCategoriesTablet,
  selectCategoriesWatch
} from 'redux/features/category/slice';
import ProductItem from './product/ProductItem';
import { Category } from 'types/category';
import { Product } from 'types/product';

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
    columnGap: theme.spacing(1.25),
    width: '100%',
    margin: '15px 0',
    borderRadius: 8,
    marginTop: theme.spacing(6),
    '& img': {
      width: 'auto',
      height: 20
    }
  },
  categoryLogo: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: 52,
    cursor: 'pointer',
    padding: '6px 13px',
    minWidth: 120
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
    columnGap: theme.spacing(1.25)
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
  const productsRefrigerator = useAppSelector(selectProductsRefrigerator);
  const categoriesPhone = useAppSelector(selectCategoriesPhone);
  const categoriesLaptop = useAppSelector(selectCategoriesLaptop);
  const categoriesTablet = useAppSelector(selectCategoriesTablet);
  const categoriesWatch = useAppSelector(selectCategoriesWatch);
  const categoriesRefrigerator = useAppSelector(selectCategoriesRefrigerator);
  const {
    getProducts,
    getProductsPhone,
    getProductsLaptop,
    getProductsTablet,
    getProductsWatch,
    getProductsRefrigerator
  } = productActions;
  const {
    getCategoriesPhone,
    getCategoriesLaptop,
    getCategoriesTablet,
    getCategoriesWatch,
    getCategoriesRefrigerator
  } = categoryActions;

  const renderProducts = (categories: Category, products: Product[], getProduct: any) => {
    return (
      <>
        <Box
          className={classes.listCategory}
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          <Typography className={classes.listTitle}>{categories?.name}</Typography>
          {categories?.children?.map((cat) => (
            <Box
              display="flex"
              justifyContent="center"
              className={classes.categoryLogo}
              key={cat._id}
            >
              <img
                src={cat.image || ''}
                onClick={() => dispatch(getProduct(cat._id || ''))}
                alt="category"
              />
            </Box>
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
            {products?.map((product) => (
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
      dispatch(getProductsPhone(categoriesPhone.children[0]._id!));
    }

    if (categoriesLaptop?.children) {
      dispatch(getProductsLaptop(categoriesLaptop.children[0]._id!));
    }

    if (categoriesTablet?.children) {
      dispatch(getProductsTablet(categoriesTablet.children[0]._id!));
    }

    if (categoriesWatch?.children) {
      dispatch(getProductsWatch(categoriesWatch.children[0]._id!));
    }

    if (categoriesRefrigerator?.children) {
      dispatch(getProductsRefrigerator(categoriesRefrigerator.children[0]._id!));
    }
  }, [products]);

  useEffect(() => {
    dispatch(getCategoriesPhone());
    dispatch(getCategoriesLaptop());
    dispatch(getCategoriesTablet());
    dispatch(getCategoriesWatch());
    dispatch(getCategoriesRefrigerator());
  }, [categories]);

  return (
    <Layout>
      <Toolbar />
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
        {renderProducts(categoriesPhone, productsPhone, getProductsPhone)}
        {renderProducts(categoriesLaptop, productsLaptop, getProductsLaptop)}
        {renderProducts(categoriesTablet, productsTablet, getProductsTablet)}
        {renderProducts(categoriesWatch, productsWatch, getProductsWatch)}
        {renderProducts(categoriesRefrigerator, productsRefrigerator, getProductsRefrigerator)}
      </div>
    </Layout>
  );
};

export default Home;
