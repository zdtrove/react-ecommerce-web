import { Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Layout from 'components/layouts';
import { Button } from 'components/UI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  categoryActions,
  selectCategories,
  selectCategoriesById
} from 'redux/features/category/slice';
import {
  productActions,
  selectProducts,
  selectProductsByCategoryIds
} from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Product } from 'types/product';
import ProductItem from './product/ProductItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(6)
  },
  list: {
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(2)
  },
  loadMore: {
    margin: 20,
    padding: '5px 20px',
    borderRadius: 20
  }
}));

const Category = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsByCategoryIds = useAppSelector(selectProductsByCategoryIds);
  const categories = useAppSelector(selectCategories);
  const categoriesById = useAppSelector(selectCategoriesById);
  const { getProducts, getProductsByCategoryIds } = productActions;
  const { getCategoriesById } = categoryActions;
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [productList, setProductList] = useState<Product[]>(productsByCategoryIds);
  const [productSlice, setProductSlice] = useState<Product[]>([]);
  const [loadMoreNumber, setLoadMoreNumber] = useState<number>(10);
  const [remainNumber, setRemainNumber] = useState<number>(0);

  useEffect(() => {
    setProductSlice(productList.slice(0, loadMoreNumber));
    if (productList.length) {
      setRemainNumber(productList.length - loadMoreNumber);
    }
  }, [loadMoreNumber]);

  useEffect(() => {
    setProductSlice(productList.slice(0, loadMoreNumber));
    productList.length && setRemainNumber(productList.length - loadMoreNumber);
  }, [productList]);

  useEffect(() => {
    setProductList(productsByCategoryIds);
  }, [productsByCategoryIds]);

  useEffect(() => {
    dispatch(getProductsByCategoryIds(categoryIds));
  }, [categoryIds, products]);

  useEffect(() => {
    const ids: string[] = [];
    categoriesById?.children?.forEach((cat) => ids.push(cat._id!));
    setCategoryIds(ids);
  }, [categoriesById]);

  useEffect(() => {
    dispatch(getCategoriesById(id));
  }, [id, categories]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <Toolbar />
      <Box className={classes.root}>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          <b>{categoriesById?.name}</b> ({productList.length}) products
        </Typography>
        <Box
          className={classes.list}
          display="flex"
          justifyContent="left"
          alignItems="center"
          flexWrap="wrap"
        >
          {productSlice.length >= 0 &&
            productSlice.map((product) => <ProductItem key={product._id} product={product} />)}
        </Box>
        {productSlice.length >= 0 && remainNumber > 0 && (
          <Box display="flex" justifyContent="center">
            <Button
              className={classes.loadMore}
              text={`Load More (${remainNumber}) products`}
              onClick={() => setLoadMoreNumber(loadMoreNumber + 5)}
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Category;
