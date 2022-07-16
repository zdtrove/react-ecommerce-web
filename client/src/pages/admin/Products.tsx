import {
  makeStyles,
  Paper,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import Layout from 'components/admin/layouts';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { Button, Input, Dialog, Table, TableHeader, TablePaginationActions } from 'components/UI';
import { useEffect, useState } from 'react';
import Add from 'components/admin/product/Add';
import Detail from 'components/admin/product/Detail';
import Edit from 'components/admin/product/Edit';
import { Product } from 'types/product';
import { productActions, selectProducts } from 'redux/features/product/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { findCategoryById } from 'utils/functions';
import { selectCategories } from 'redux/features/category/slice';
import { Category } from 'types/category';

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
  const [searchValue, setSearchValue] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
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

  const handleDeleteProduct = (id: string) => {
    dispatch(productActions.deleteProduct(id));
    setShowDelete(false);
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (!products.length) {
      dispatch(productActions.getProducts());
    }
  }, []);

  useEffect(() => {
    setPage(0);
    setProductList(
      products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
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
            onClick={() => setShowAdd(true)}
            variant="outlined"
            startIcon={<AddIcon />}
            text="ADD NEW"
          />
        </Toolbar>
        <Table headers={['Name', 'Description', 'Price', 'Actions']}>
          {productList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((productItem: Product, idx: number) => (
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
      {showAdd && (
        <Add
          {...{
            products,
            showAdd,
            setShowAdd
          }}
        />
      )}
      {showDetail && (
        <Detail
          {...{
            category,
            showDetail,
            setShowDetail,
            product
          }}
        />
      )}
      {showEdit && (
        <Edit
          {...{
            showEdit,
            setShowEdit,
            product
          }}
        />
      )}
      {showDelete && (
        <Dialog show={showDelete} setShow={setShowDelete} title="DELETE PRODUCT">
          <DialogContent>
            <DialogContentText>
              Are you sure to delete <strong>{product?.name}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteProduct(product?._id || '')}
              color="secondary"
              text="DELETE"
            />
            <Button onClick={() => setShowDelete(false)} color="default" text="CANCEL" />
          </DialogActions>
        </Dialog>
      )}
    </Layout>
  );
};

export default Products;
