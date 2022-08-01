import { Toolbar } from '@material-ui/core';
import Layout from 'components/layouts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  productActions,
  selectProducts,
  selectProductsByCategoryId
} from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  console.log(products);
  const productsByCategoryId = useAppSelector(selectProductsByCategoryId);
  const { getProducts, getProductsByCategoryId } = productActions;
  console.log(productsByCategoryId);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getProductsByCategoryId(id));
  }, [products]);

  return (
    <Layout>
      <Toolbar />
      <Toolbar />
      Category page
    </Layout>
  );
};

export default Category;
