import { Box, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import Layout from 'components/layouts';
import { LOAD_MORE } from 'constants/index';
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
  selectProductsByCategoryId,
  selectProductsByCategoryIds
} from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Product } from 'types/product';
import ProductItem from './product/ProductItem';
import clsx from 'clsx';
import { Category } from 'types/category';

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
  },
  listCategory: {
    backgroundColor: theme.palette.primary.light,
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
  active: {
    border: '2.5px solid chartreuse'
  }
}));

const CategoryPage = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsByCategoryIds = useAppSelector(selectProductsByCategoryIds);
  const productsByCategoryId = useAppSelector(selectProductsByCategoryId);
  const categories = useAppSelector(selectCategories);
  const categoriesById = useAppSelector(selectCategoriesById);
  const { getProducts, getProductsByCategoryIds, getProductsByCategoryId } = productActions;
  const { getCategoriesById } = categoryActions;
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [productList, setProductList] = useState<Product[]>(productsByCategoryIds);
  const [productSlice, setProductSlice] = useState<Product[]>([]);
  const [loadMoreNumber, setLoadMoreNumber] = useState<number>(LOAD_MORE);
  const [remainNumber, setRemainNumber] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<Category>({} as Category);

  useEffect(() => {
    setProductList(productsByCategoryId);
  }, [productsByCategoryId]);

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
    setLoadMoreNumber(LOAD_MORE);
    setCurrentCategory({} as Category);
  }, [id]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Layout>
      <Toolbar />
      <Box className={classes.root}>
        <Box
          className={classes.listCategory}
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          {categoriesById?.children?.map((cat) => (
            <Box
              display="flex"
              justifyContent="center"
              className={clsx(classes.categoryLogo, {
                [classes.active]: cat._id === currentCategory._id
              })}
              key={cat._id}
            >
              <img
                src={cat.image || ''}
                onClick={() => {
                  dispatch(getProductsByCategoryId(cat._id!));
                  setCurrentCategory(cat);
                  setLoadMoreNumber(LOAD_MORE);
                }}
                alt="category"
              />
            </Box>
          ))}
        </Box>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          <b>{categoriesById?.name}</b> <b style={{ color: 'green' }}>{currentCategory.name}</b> (
          {productList.length}) products
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
              onClick={() => setLoadMoreNumber(loadMoreNumber + LOAD_MORE)}
              variant="contained"
              color="primary"
              style={{ textTransform: 'none' }}
            >
              Load More ({remainNumber}) products
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default CategoryPage;
