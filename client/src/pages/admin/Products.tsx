import PropTypes from 'prop-types';
import {
  Card,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core';
import LayoutAdmin from 'components/admin/layouts/LayoutAdmin';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button, Input } from 'components/UI';
import { useEffect, useState } from 'react';
import ProductAdd from 'components/admin/product/ProductAdd';
import { Product } from 'types/product';
import { productActions, selectProducts } from 'redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from 'redux/hook';

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    minWidth: 240
  },
  header: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4)
    },
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  headerIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1'
  },
  headerTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  },
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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange
}: TablePaginationActionsProps) => {
  const classes = useStyles1();
  const theme = useTheme();

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  onPageChange: PropTypes.any
};

const Products = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const products = useAppSelector(selectProducts);
  const [searchValue, setSearchValue] = useState('');
  const [showProductAdd, setShowProductAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  // const [showProductDetail, setShowProductDetail] = useState(false);
  // const [showProductEdit, setShowProductEdit] = useState(false);
  // const [showProductDelete, setShowProductDelete] = useState(false);
  // const [productRecord, setProductRecord] = useState<Product>({} as Product);
  const [productList, setProductList] = useState<Product[]>([]);

  const onPageChange = (e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [dispatch]);

  useEffect(() => {
    setPage(0);
    setProductList(
      products.filter((product: Product) => product.name.toLowerCase().includes(searchValue))
    );
  }, [searchValue]);

  return (
    <LayoutAdmin>
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <ShoppingCartIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Products
            </Typography>
            <Typography variant="subtitle2" component="div">
              Products list
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper className={classes.rootTable}>
        <TableContainer>
          <Toolbar className={classes.tableAction}>
            <Input
              label="Search Products"
              startIcon={<SearchIcon />}
              onChange={(e) => setSearchValue(e.target.value)}
              margin="none"
              value={searchValue}
            />
            <Button
              onClick={() => setShowProductAdd(true)}
              variant="outlined"
              startIcon={<AddIcon />}
              text="ADD NEW"
            />
          </Toolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product: Product, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.images}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          // setProductRecord(product);
                          // setShowProductDetail(true);
                        }}
                        className={classes.marginBtn}
                        text="DETAIL"
                        color="default"
                      />
                      <Button
                        onClick={() => {
                          // setProductRecord(product);
                          // setShowProductEdit(true);
                        }}
                        className={classes.marginBtn}
                        text="EDIT"
                      />
                      <Button
                        className={classes.marginBtn}
                        color="secondary"
                        text="DELETE"
                        onClick={() => {
                          // setProductRecord(product);
                          // setShowProductDelete(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
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
      </Paper>
      {showProductAdd && (
        <ProductAdd
          {...{
            products,
            showProductAdd,
            setShowProductAdd
          }}
        />
      )}
    </LayoutAdmin>
  );
};

export default Products;
