import { Box, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
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

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { formatNumber } from 'utils/functions';
import ProductItem from 'components/product/ProductItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
    paddingBottom: theme.spacing(6)
  },
  gallery: {
    height: 500,
    width: 700,
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
  detail: {
    columnGap: theme.spacing(2)
  },
  related: {
    backgroundColor: theme.palette.primary.light,
    padding: `${theme.spacing(1.5)}px`,
    marginTop: theme.spacing(6)
  }
}));

const ProductPage = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const products = useAppSelector(selectProducts);
  const productsRelated = useAppSelector(selectProductsRelated);
  const { getProductById, getProducts, getProductsRelated } = productActions;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const handleLightBox = (image: string) => {
    setOpenLightBox(true);
    setCurrentImage(image);
  };

  useEffect(() => {
    if (product?.images) {
      const images: string[] = [];
      product?.images.forEach((item, index) => index && images.push(item.url));
      setImages(images);
    }
    dispatch(getProductsRelated(product?.categoryId));
  }, [product]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [products]);

  useEffect(() => {
    !products.length && dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <Toolbar />
      <Box className={classes.root}>
        <Box className={classes.detail} display="flex">
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
          <Box>
            <Typography variant="h5">{product?.name}</Typography>
            <Typography variant="h5" color="secondary">
              {product?.price && formatNumber(product?.price)}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.related}>
          <Typography variant="h5" style={{ margin: '10px 0', color: 'white' }}>
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
