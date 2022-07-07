import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import LayoutAdmin from 'components/admin/layouts/LayoutAdmin';
import { Input, Button, Dialog } from 'components/UI';
import {
  makeStyles,
  useTheme,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Card,
  Typography,
  Toolbar,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from '@material-ui/core';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import StoreDetail from 'components/admin/store/StoreDetail';
import StoreEdit from 'components/admin/store/StoreEdit';
import StoreAdd from 'components/admin/store/StoreAdd';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Store } from 'types/store';
import { storeActions, selectStores } from 'redux/features/store/storeSlice';

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

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (store: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }: Props) => {
  const classes = useStyles1();
  const theme = useTheme();

  const handleFirstPageButtonClick = (store: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(store, 0);
  };

  const handleBackButtonClick = (store: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(store, page - 1);
  };

  const handleNextButtonClick = (store: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(store, page + 1);
  };

  const handleLastPageButtonClick = (store: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(store, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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

const Stores = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const stores = useAppSelector(selectStores);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [showStoreEdit, setShowStoreEdit] = useState(false);
  const [showStoreDelete, setShowStoreDelete] = useState(false);
  const [showStoreAdd, setShowStoreAdd] = useState(false);
  const [storeRecord, setStoreRecord] = useState<Store>({} as Store);
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const onPageChange = (e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleDeleteStore = (id: string) => {
    dispatch(storeActions.deleteStore(id));
    setShowStoreDelete(false);
  };

  useEffect(() => {
    setStoreList(stores);
  }, [stores]);

  useEffect(() => {
    dispatch(storeActions.getStores());
  }, [dispatch]);

  useEffect(() => {
    setPage(0);
    setStoreList(
      stores.filter((store: Store) => store.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [searchValue]);

  return (
    <LayoutAdmin>
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <PeopleOutlineTwoToneIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Stores
            </Typography>
            <Typography variant="subtitle2" component="div">
              List Stores
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper className={classes.rootTable}>
        <TableContainer>
          <Toolbar className={classes.tableAction}>
            <Input
              label="Search Stores"
              startIcon={<SearchIcon />}
              onChange={(e) => setSearchValue(e.target.value)}
              margin="none"
              value={searchValue}
            />
            <Button
              onClick={() => setShowStoreAdd(true)}
              variant="outlined"
              startIcon={<AddIcon />}
              text="ADD NEW"
            />
          </Toolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storeList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((store: Store, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.address}</TableCell>
                    <TableCell>{store.region}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setStoreRecord(store);
                          setShowStoreDetail(true);
                        }}
                        className={classes.marginBtn}
                        text="DETAIL"
                        color="default"
                      />
                      <Button
                        onClick={() => {
                          setStoreRecord(store);
                          setShowStoreEdit(true);
                        }}
                        className={classes.marginBtn}
                        text="EDIT"
                      />
                      <Button
                        className={classes.marginBtn}
                        color="secondary"
                        text="DELETE"
                        onClick={() => {
                          setStoreRecord(store);
                          setShowStoreDelete(true);
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
            count={storeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            ActionsComponent={TablePaginationActions}
          />
        </TableContainer>
      </Paper>
      {showStoreAdd && (
        <StoreAdd
          {...{
            showStoreAdd,
            setShowStoreAdd
          }}
        />
      )}
      {showStoreDetail && (
        <StoreDetail
          {...{
            showStoreDetail,
            setShowStoreDetail,
            storeRecord
          }}
        />
      )}
      {showStoreEdit && (
        <StoreEdit
          {...{
            showStoreEdit,
            setShowStoreEdit,
            storeRecord
          }}
        />
      )}
      {showStoreDelete && (
        <Dialog show={showStoreDelete} setShow={setShowStoreDelete} title="DELETE EVENT">
          <DialogContent>
            <DialogContentText>
              Are you sure to delete <strong>{storeRecord?.name}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteStore(storeRecord?._id || '')}
              color="secondary"
              text="DELETE"
            />
            <Button onClick={() => setShowStoreDelete(false)} color="default" text="CANCEL" />
          </DialogActions>
        </Dialog>
      )}
    </LayoutAdmin>
  );
};

export default Stores;
