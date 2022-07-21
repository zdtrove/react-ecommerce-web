import { Fragment, useEffect } from 'react';
import { Toolbar } from '@material-ui/core';
import Cart from 'components/cart';
import Layout from 'components/layouts';
import { productActions, selectProducts } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Button } from 'components/UI';
import { cartActions } from 'redux/features/cart/slice';
import { Product } from 'types/product';
import { selectIsLoggedIn } from 'redux/features/auth/slice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { getProducts } = productActions;
  const { addToCart } = cartActions;

  useEffect(() => {
    dispatch(getProducts());
  }, [isLoggedIn]);

  return (
    <Layout>
      <Toolbar />
      <h1>HOME PAGE</h1>
      <Cart />
      {products?.length &&
        products.map((product: Product) => (
          <Fragment key={product._id}>
            <p>{product.name}</p>
            {product.inCart ? (
              <Button variant="contained" disabled text="In Cart" />
            ) : (
              <Button
                onClick={() => dispatch(addToCart({ product, products, inCart: true }))}
                text="Add To Cart"
              />
            )}
          </Fragment>
        ))}
      <Swiper navigation={true} modules={[Navigation]}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </Layout>
  );
};

export default Home;
