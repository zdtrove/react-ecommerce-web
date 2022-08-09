import {
  makeStyles,
  Paper,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar
} from '@material-ui/core';
import Layout from 'components/admin/layouts';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { Button, Input, Table, TableHeader, TablePaginationActions } from 'components/UI';
import { useEffect, useState } from 'react';
import Add from 'components/admin/product/Add';
import Detail from 'components/admin/product/Detail';
import Edit from 'components/admin/product/Edit';
import { Product } from 'types/product';
import { productActions, selectProducts } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { findCategoryById } from 'utils/functions';
import { categoryActions, selectCategories } from 'redux/features/category/slice';
import { Category } from 'types/category';
import { uiActions } from 'redux/features/ui/slice';
import Delete from 'components/admin/product/Delete';

const useStyles = makeStyles((theme) => ({
  marginBtn: {
    margin: theme.spacing(0.5)
  },
  rootTable: {
    minWidth: 240
  },
  tableAction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'baseline',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    '& .MuiButtonBase-root': {
      minWidth: 110,
      padding: 5,
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1)
      }
    },
    '& .MuiFormControl-root': {
      maxWidth: 300
    },
    '& .MuiInputBase-input': {
      padding: 11,
      paddingLeft: 0
    }
  }
}));

const Products = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const { showModal } = uiActions;
  const [searchValue, setSearchValue] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [productList, setProductList] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>({} as Category);

  const onPageChange = (e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  useEffect(() => {
    let temp = products;
    if (searchValue) {
      temp = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setProductList(temp);
  }, [products]);

  useEffect(() => {
    !products.length && dispatch(productActions.getProducts());
    !categories.length && dispatch(categoryActions.getCategories());
  }, []);

  useEffect(() => {
    setPage(0);
    setProductList(
      products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [searchValue]);

  return (
    <Layout>
      <TableHeader title="Products" subtitle="Products list" icon={<ShoppingCartIcon />} />
      <TableContainer className={classes.rootTable} component={Paper}>
        <Toolbar className={classes.tableAction}>
          <Input
            label="Search Products"
            startIcon={<SearchIcon />}
            onChange={(e) => setSearchValue(e.target.value)}
            margin="none"
            value={searchValue}
          />
          <Button
            onClick={() => {
              dispatch(showModal());
              setShowAdd(true);
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            text="ADD NEW"
          />
        </Toolbar>
        <Table headers={['Name', 'Description', 'Price', 'Actions']}>
          {productList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((productItem, idx) => (
              <TableRow key={idx}>
                <TableCell>{productItem.name}</TableCell>
                <TableCell>{productItem.description}</TableCell>
                <TableCell>{productItem.price}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setCategory(findCategoryById(categories, productItem.categoryId, category));
                      setProduct(productItem);
                      setShowDetail(true);
                    }}
                    className={classes.marginBtn}
                    text="DETAIL"
                    color="default"
                  />
                  <Button
                    onClick={() => {
                      setProduct(productItem);
                      dispatch(showModal());
                      setShowEdit(true);
                    }}
                    className={classes.marginBtn}
                    text="EDIT"
                  />
                  <Button
                    className={classes.marginBtn}
                    color="secondary"
                    text="DELETE"
                    onClick={() => {
                      setProduct(productItem);
                      dispatch(showModal());
                      setShowDelete(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 6, 10, 25, 50]}
          component="div"
          count={productList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
      {showAdd && <Add show={showAdd} setShow={setShowAdd} />}
      {showDetail && (
        <Detail category={category} show={showDetail} setShow={setShowDetail} product={product} />
      )}
      {showEdit && <Edit show={showEdit} setShow={setShowEdit} product={product} />}
      {showDelete && <Delete show={showDelete} setShow={setShowDelete} product={product} />}
    </Layout>
  );
};

export default Products;
