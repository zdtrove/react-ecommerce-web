import { Fragment, useEffect } from 'react';
import { Toolbar } from '@material-ui/core';
import Cart from 'components/cart';
import Layout from 'components/layouts/Layout';
import { productActions, selectProducts } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Button } from 'components/UI';
import { cartActions } from 'redux/features/cart/slice';
import { Product } from 'types/product';

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
        products.map((product: Product) => (
          <Fragment key={product._id}>
            <p>{product.name}</p>
            {product.inCart ? (
              <Button variant="contained" disabled text="In Cart" />
            ) : (
              <Button
                onClick={() => dispatch(addToCart({ product, products }))}
                text="Add To Cart"
              />
            )}
          </Fragment>
        ))}
    </Layout>
  );
};

export default Home;
