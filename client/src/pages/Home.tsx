import { Fragment, useEffect } from 'react';
import { Toolbar } from '@material-ui/core';
import Cart from 'components/cart/Cart';
import Layout from 'components/layouts/Layout';
import { productActions, selectProducts } from 'redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Button } from 'components/UI';
import { cartActions } from 'redux/features/cart/cartSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const { getProducts } = productActions;
  const { addToCart } = cartActions;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <Toolbar />
      <h1>HOME PAGE</h1>
      <Cart />
      {products?.length &&
        products.map((product) => (
          <Fragment key={product._id}>
            <p>{product.name}</p>
            <Button onClick={() => dispatch(addToCart(product))} text="Add To Cart" />
          </Fragment>
        ))}
    </Layout>
  );
};

export default Home;
