import {
  Box,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import Layout from 'components/layouts';
import { LOAD_MORE } from 'constants/index';
import { useCallback, useEffect, useState } from 'react';
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
import ProductItem from '../components/product/ProductItem';
import clsx from 'clsx';
import { Category } from 'types/category';
import { Input } from 'components/UI';
import * as _ from 'lodash';

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
  },
  sortBy: {
    minWidth: 150,
    '& .MuiSelect-root': {
      padding: theme.spacing(1.25, 4, 1.25, 1.25)
    }
  },
  filterForm: {
    columnGap: theme.spacing(2)
  },
  searchInput: {
    marginTop: 0,
    marginBottom: 0,
    '& .MuiInputBase-input': {
      padding: theme.spacing(1.25)
    }
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
  const { getProductsByCategoryIds, getProductsByCategoryId } = productActions;
  const { getCategoriesById } = categoryActions;
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [productList, setProductList] = useState<Product[]>(productsByCategoryIds);
  const [productSlice, setProductSlice] = useState<Product[]>([]);
  const [loadMoreNumber, setLoadMoreNumber] = useState<number>(LOAD_MORE);
  const [remainNumber, setRemainNumber] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<Category>({} as Category);
  const [sortBy, setSortBy] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState('');

  const handleChangeSortPrice = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  const sortProduct = (products: Product[]) => {
    return products.sort((a, b) => {
      switch (sortBy) {
        case 'asc':
          return a.price - b.price;
        case 'desc':
          return b.price - a.price;
        default:
          return b.sold - a.sold;
      }
    });
  };

  const searchProduct = (products: Product[]) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  };

  const debounceSearchFn = useCallback(_.debounce(setSearch, 500), []);

  const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchValue(event.target.value as string);
    debounceSearchFn(event.target.value as string);
  };

  useEffect(() => {
    if (productsByCategoryId.length) {
      setProductList(
        searchProduct(sortBy ? sortProduct([...productsByCategoryId]) : [...productsByCategoryId])
      );
    } else if (productsByCategoryIds.length) {
      setProductList(
        searchProduct(sortBy ? sortProduct([...productsByCategoryIds]) : [...productsByCategoryIds])
      );
    }
  }, [search]);

  useEffect(() => {
    productList.length && setProductList(sortProduct([...productList]));
  }, [sortBy]);

  useEffect(() => {
    if (productsByCategoryId.length) {
      let temp = [...productsByCategoryId];
      sortBy && (temp = sortProduct(temp));
      setProductList(temp);
    } else setProductList([]);
    setSearch('');
    setSearchValue('');
  }, [productsByCategoryId]);

  useEffect(() => {
    setProductSlice(productList.slice(0, loadMoreNumber));
    productList.length && setRemainNumber(productList.length - loadMoreNumber);
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
              key={cat._id}
              display="flex"
              justifyContent="center"
              className={clsx(classes.categoryLogo, {
                [classes.active]: cat._id === currentCategory._id
              })}
              onClick={() => {
                dispatch(getProductsByCategoryId(cat._id!));
                setCurrentCategory(cat);
                setLoadMoreNumber(LOAD_MORE);
              }}
            >
              <img src={cat.image!} alt="category" />
            </Box>
          ))}
        </Box>
        <Box className={classes.filterForm} display="flex" alignItems="center" mb={2}>
          <Box>
            <Typography variant="subtitle2">Sort by</Typography>
            <FormControl variant="outlined">
              <Select className={classes.sortBy} value={sortBy} onChange={handleChangeSortPrice}>
                <MenuItem disabled value="">
                  Select
                </MenuItem>
                <MenuItem value="desc">Giá giảm dần</MenuItem>
                <MenuItem value="asc">Giá tăng dần</MenuItem>
                <MenuItem value="bestseller">Bán chạy nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="subtitle2">Search</Typography>
            <Input className={classes.searchInput} value={searchValue} onChange={handleSearch} />
          </Box>
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

export default CategoryPage;
