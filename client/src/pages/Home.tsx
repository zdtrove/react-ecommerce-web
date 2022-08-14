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

const { smartphone, laptop, tablet, watch, refrigerator, airConditioner, washingMachine } =
  HOME_CATEGORY_IDS;

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
    border: '2.5px solid #e0e0e0',
    borderRadius: 52,
    cursor: 'pointer',
    padding: '6px 13px',
    minWidth: 120,
    '&:hover': {
      border: '2.5px solid chartreuse'
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
  const [prodPhone, setProdPhone] = useState<Product[]>([]);
  const [prodLaptop, setProdLaptop] = useState<Product[]>([]);
  const [prodTablet, setProdTablet] = useState<Product[]>([]);
  const [prodWatch, setProdWatch] = useState<Product[]>([]);
  const [prodRefrigerator, setProdRefrigerator] = useState<Product[]>([]);
  const [prodAirConditioner, setProdAirConditioner] = useState<Product[]>([]);
  const [prodWashingMachine, setProdWashingMachine] = useState<Product[]>([]);
  const [catsPhone, setCatsPhone] = useState<Category>({} as Category);
  const [catsLaptop, setCatsLaptop] = useState<Category>({} as Category);
  const [catsTablet, setCatsTablet] = useState<Category>({} as Category);
  const [catsWatch, setCatsWatch] = useState<Category>({} as Category);
  const [catsRefrigerator, setCatsRefrigerator] = useState<Category>({} as Category);
  const [catsAirConditioner, setCatsAirConditioner] = useState<Category>({} as Category);
  const [catsWashingMachine, setCatsWashingMachine] = useState<Category>({} as Category);
  const [currentCatsPhoneId, setCurrentCatsPhoneId] = useState('');
  const [currentCatsLaptopId, setCurrentCatsLaptopId] = useState('');
  const [currentCatsTabletId, setCurrentCatsTabletId] = useState('');
  const [currentCatsWatchId, setCurrentCatsWatchId] = useState('');
  const [currentCatsRefrigeratorId, setCurrentCatsRefrigeratorId] = useState('');
  const [currentCatsAirConditionerId, setCurrentCatsAirConditionerId] = useState('');
  const [currentCatsWashingMachineId, setCurrentCatsWashingMachineId] = useState('');

  const handleSetProducts = (categoryId: string, setProd: any) => {
    setProd(products.filter((product) => product.categoryId === categoryId));
  };

  const renderProducts = (
    categories: Category,
    products: Product[],
    setProd: any,
    currentCatsId: string,
    setCurrentCatsId: any
  ) => {
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
                [classes.active]: cat._id === currentCatsId
              })}
              onClick={() => {
                handleSetProducts(cat._id!, setProd);
                setCurrentCatsId(cat._id!);
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
    const catsPhone = categories.filter((cat) => cat._id === smartphone)[0];
    const catsLaptop = categories.filter((cat) => cat._id === laptop)[0];
    const catsTablet = categories.filter((cat) => cat._id === tablet)[0];
    const catsWatch = categories.filter((cat) => cat._id === watch)[0];
    const catsRefrigerator = categories.filter((cat) => cat._id === refrigerator)[0];
    const catsAirConditioner = categories.filter((cat) => cat._id === airConditioner)[0];
    const catsWashingMachine = categories.filter((cat) => cat._id === washingMachine)[0];
    setCatsPhone(catsPhone);
    setCatsLaptop(catsLaptop);
    setCatsTablet(catsTablet);
    setCatsWatch(catsWatch);
    setCatsRefrigerator(catsRefrigerator);
    setCatsAirConditioner(catsAirConditioner);
    setCatsWashingMachine(catsWashingMachine);
    setProdPhone(products.filter(({ categoryId }) => categoryId === catsPhone.children[0]._id!));
    setProdLaptop(products.filter(({ categoryId }) => categoryId === catsLaptop.children[0]._id!));
    setProdTablet(products.filter(({ categoryId }) => categoryId === catsTablet.children[0]._id!));
    setProdWatch(products.filter(({ categoryId }) => categoryId === catsWatch.children[0]._id!));
    setProdRefrigerator(
      products.filter(({ categoryId }) => categoryId === catsRefrigerator.children[0]._id!)
    );
    setProdAirConditioner(
      products.filter(({ categoryId }) => categoryId === catsAirConditioner.children[0]._id!)
    );
    setProdWashingMachine(
      products.filter(({ categoryId }) => categoryId === catsWashingMachine.children[0]._id!)
    );
    currentCatsPhoneId &&
      setProdPhone(products.filter(({ categoryId }) => categoryId === currentCatsPhoneId));
    currentCatsLaptopId &&
      setProdLaptop(products.filter(({ categoryId }) => categoryId === currentCatsLaptopId));
    currentCatsTabletId &&
      setProdTablet(products.filter(({ categoryId }) => categoryId === currentCatsTabletId));
    currentCatsWatchId &&
      setProdWatch(products.filter(({ categoryId }) => categoryId === currentCatsWatchId));
    currentCatsRefrigeratorId &&
      setProdRefrigerator(
        products.filter(({ categoryId }) => categoryId === currentCatsRefrigeratorId)
      );
    currentCatsAirConditionerId &&
      setProdAirConditioner(
        products.filter(({ categoryId }) => categoryId === currentCatsAirConditionerId)
      );
    currentCatsWashingMachineId &&
      setProdWashingMachine(
        products.filter(({ categoryId }) => categoryId === currentCatsWashingMachineId)
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
        {renderProducts(
          catsPhone,
          prodPhone,
          setProdPhone,
          currentCatsPhoneId,
          setCurrentCatsPhoneId
        )}
        {renderProducts(
          catsLaptop,
          prodLaptop,
          setProdLaptop,
          currentCatsLaptopId,
          setCurrentCatsLaptopId
        )}
        {renderProducts(
          catsTablet,
          prodTablet,
          setProdTablet,
          currentCatsTabletId,
          setCurrentCatsTabletId
        )}
        {renderProducts(
          catsWatch,
          prodWatch,
          setProdWatch,
          currentCatsWatchId,
          setCurrentCatsWatchId
        )}
        {renderProducts(
          catsRefrigerator,
          prodRefrigerator,
          setProdRefrigerator,
          currentCatsRefrigeratorId,
          setCurrentCatsRefrigeratorId
        )}
        {renderProducts(
          catsAirConditioner,
          prodAirConditioner,
          setProdAirConditioner,
          currentCatsAirConditionerId,
          setCurrentCatsAirConditionerId
        )}
        {renderProducts(
          catsWashingMachine,
          prodWashingMachine,
          setProdWashingMachine,
          currentCatsWashingMachineId,
          setCurrentCatsWashingMachineId
        )}
      </div>
    </Layout>
  );
};

export default Home;
