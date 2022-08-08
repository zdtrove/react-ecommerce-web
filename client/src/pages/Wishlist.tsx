import { useState, useEffect } from 'react';
import Layout from 'components/layouts';
import { Typography, makeStyles, Box, Toolbar, Button } from '@material-ui/core';
import { Product } from 'types/product';
import { LOAD_MORE } from 'constants/index';
import ProductItem from 'components/product/ProductItem';
import { selectWishlist } from 'redux/features/auth/slice';
import { selectProducts } from 'redux/features/product/slice';
import { useAppSelector } from 'redux/hook';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(6)
  },
  list: {
    columnGap: theme.spacing(1.5),
    rowGap: theme.spacing(1.5),
    marginTop: theme.spacing(1)
  },
  loadMore: {
    margin: 20,
    padding: '5px 20px',
    borderRadius: 20
  }
}));

const Wishlist = () => {
  const classes = useStyles();
  const products = useAppSelector(selectProducts);
  const wishlist = useAppSelector(selectWishlist);
  const [productList, setProductList] = useState<Product[]>([]);
  const [productSlice, setProductSlice] = useState<Product[]>([]);
  const [loadMoreNumber, setLoadMoreNumber] = useState<number>(LOAD_MORE);
  const [remainNumber, setRemainNumber] = useState<number>(0);

  useEffect(() => {
    setProductSlice(productList.slice(0, loadMoreNumber));
    productList.length && setRemainNumber(productList.length - loadMoreNumber);
  }, [loadMoreNumber]);

  useEffect(() => {
    setProductSlice(productList.slice(0, loadMoreNumber));
    productList.length && setRemainNumber(productList.length - loadMoreNumber);
  }, [productList]);

  useEffect(() => {
    setProductSlice(productList.slice(0, loadMoreNumber));
  }, [productList]);

  useEffect(() => {
    const temp: Product[] = [];
    if (wishlist.length) {
      products.map((product) => wishlist.includes(product._id!) && temp.push(product));
    }
    setProductList(temp);
  }, [products, wishlist]);

  return (
    <Layout>
      <Toolbar />
      <Box className={classes.root}>
        <Typography variant="h3">
          Wishlist{' '}
          <small>
            (<b>{productList.length || 0}</b>)
          </small>
        </Typography>
        <Box
          className={classes.list}
          display="flex"
          justifyContent="left"
          alignItems="center"
          flexWrap="wrap"
        >
          {productSlice.length > 0 &&
            productSlice.map((product) => <ProductItem key={product._id} product={product} />)}
        </Box>
        {productSlice.length > 0 && remainNumber > 0 && (
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

export default Wishlist;
