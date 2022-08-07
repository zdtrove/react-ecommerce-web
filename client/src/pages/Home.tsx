import { useState, useEffect } from 'react';
import { Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Layout from 'components/layouts';
import { useAppSelector } from 'redux/hook';
import { Button } from 'components/UI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { selectProducts } from 'redux/features/product/slice';
import { selectCategories } from 'redux/features/category/slice';
import ProductItem from '../components/product/ProductItem';
import { Category } from 'types/category';
import { Product } from 'types/product';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { HOME_CATEGORY_IDS } from 'constants/index';

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
      height: 20,
      maxWidth: 90
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
  },
  active: {
    border: '2.5px solid chartreuse'
  }
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const [productsPhone, setProductsPhone] = useState<Product[]>([]);
  const [productsLaptop, setProductsLaptop] = useState<Product[]>([]);
  const [productsTablet, setProductsTablet] = useState<Product[]>([]);
  const [productsWatch, setProductsWatch] = useState<Product[]>([]);
  const [productsRefrigerator, setProductsRefrigerator] = useState<Product[]>([]);
  const [productsAirConditioner, setProductsAirConditioner] = useState<Product[]>([]);
  const [productsWashingMachine, setProductsWashingMachine] = useState<Product[]>([]);
  const [categoriesPhone, setCategoriesPhone] = useState<Category>({} as Category);
  const [categoriesLaptop, setCategoriesLaptop] = useState<Category>({} as Category);
  const [categoriesTablet, setCategoriesTablet] = useState<Category>({} as Category);
  const [categoriesWatch, setCategoriesWatch] = useState<Category>({} as Category);
  const [categoriesRefrigerator, setCategoriesRefrigerator] = useState<Category>({} as Category);
  const [categoriesAirConditioner, setCategoriesAirConditioner] = useState<Category>(
    {} as Category
  );
  const [categoriesWashingMachine, setCategoriesWashingMachine] = useState<Category>(
    {} as Category
  );
  const [currentCategoryId, setCurrentCategoryId] = useState('');

  const handleSetProducts = (categoryId: string, setProducts: any) => {
    setProducts(products.filter((product) => product.categoryId === categoryId));
  };

  const renderProducts = (categories: Category, products: Product[], setProducts: any) => {
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
              key={cat._id}
              display="flex"
              justifyContent="center"
              className={clsx(classes.categoryLogo, {
                [classes.active]: cat._id === currentCategoryId
              })}
              onClick={() => {
                handleSetProducts(cat._id!, setProducts);
                setCurrentCategoryId(cat._id!);
              }}
            >
              <img src={cat.image!} alt="category" />
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
            <Button
              onClick={() => history.push(`/category/${categories._id}`)}
              className={classes.viewAll}
              text="View all products"
            />
          </Box>
        </Box>
      </>
    );
  };

  useEffect(() => {
    const categoriesPhoneTemp = categories.filter(
      (cat) => cat._id === HOME_CATEGORY_IDS.smartphone
    );
    const categoriesLaptopTemp = categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.laptop);
    const categoriesTabletTemp = categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.tablet);
    const categoriesWatchTemp = categories.filter((cat) => cat._id === HOME_CATEGORY_IDS.watch);
    const categoriesRefrigeratorTemp = categories.filter(
      (cat) => cat._id === HOME_CATEGORY_IDS.refrigerator
    );
    const categoriesAirConditionerTemp = categories.filter(
      (cat) => cat._id === HOME_CATEGORY_IDS.airConditioner
    );
    const categoriesWashingMachineTemp = categories.filter(
      (cat) => cat._id === HOME_CATEGORY_IDS.washingMachine
    );
    setCategoriesPhone(categoriesPhoneTemp[0]);
    setCategoriesLaptop(categoriesLaptopTemp[0]);
    setCategoriesTablet(categoriesTabletTemp[0]);
    setCategoriesWatch(categoriesWatchTemp[0]);
    setCategoriesRefrigerator(categoriesRefrigeratorTemp[0]);
    setCategoriesAirConditioner(categoriesAirConditionerTemp[0]);
    setCategoriesWashingMachine(categoriesWashingMachineTemp[0]);
    setProductsPhone(
      products.filter((product) => product.categoryId === categoriesPhoneTemp[0].children[0]._id!)
    );
    setProductsLaptop(
      products.filter((product) => product.categoryId === categoriesLaptopTemp[0].children[0]._id!)
    );
    setProductsTablet(
      products.filter((product) => product.categoryId === categoriesTabletTemp[0].children[0]._id!)
    );
    setProductsWatch(
      products.filter((product) => product.categoryId === categoriesWatchTemp[0].children[0]._id!)
    );
    setProductsRefrigerator(
      products.filter(
        (product) => product.categoryId === categoriesRefrigeratorTemp[0].children[0]._id!
      )
    );
    setProductsAirConditioner(
      products.filter(
        (product) => product.categoryId === categoriesAirConditionerTemp[0].children[0]._id!
      )
    );
    setProductsWashingMachine(
      products.filter(
        (product) => product.categoryId === categoriesWashingMachineTemp[0].children[0]._id!
      )
    );
  }, [products]);

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
        {renderProducts(categoriesPhone, productsPhone, setProductsPhone)}
        {renderProducts(categoriesLaptop, productsLaptop, setProductsLaptop)}
        {renderProducts(categoriesTablet, productsTablet, setProductsTablet)}
        {renderProducts(categoriesWatch, productsWatch, setProductsWatch)}
        {renderProducts(categoriesRefrigerator, productsRefrigerator, setProductsRefrigerator)}
        {renderProducts(
          categoriesAirConditioner,
          productsAirConditioner,
          setProductsAirConditioner
        )}
        {renderProducts(
          categoriesWashingMachine,
          productsWashingMachine,
          setProductsWashingMachine
        )}
      </div>
    </Layout>
  );
};

export default Home;
