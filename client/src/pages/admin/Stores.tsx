import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import Layout from 'components/admin/layouts';
import { Input, Button, Table, TableHeader, TablePaginationActions } from 'components/UI';
import {
  makeStyles,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
  Toolbar
} from '@material-ui/core';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Detail from 'components/admin/store/Detail';
import Edit from 'components/admin/store/Edit';
import Add from 'components/admin/store/Add';
import { Store } from 'types/store';
import { storeActions, selectStores } from 'redux/features/store/slice';
import Delete from 'components/admin/store/Delete';
import { uiActions } from 'redux/features/ui/slice';

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

const Stores = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const stores = useAppSelector(selectStores);
  const { showModal } = uiActions;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
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

  useEffect(() => {
    setStoreList(stores);
  }, [stores]);

  useEffect(() => {
    if (!stores.length) {
      dispatch(storeActions.getStores());
    }
  }, []);

  useEffect(() => {
    setPage(0);
    setStoreList(
      stores.filter((store) => store.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [searchValue]);

  return (
    <Layout>
      <TableHeader title="Stores" subtitle="List Stores" icon={<StoreMallDirectoryIcon />} />
      <TableContainer className={classes.rootTable} component={Paper}>
        <Toolbar className={classes.tableAction}>
          <Input
            label="Search Stores"
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
        <Table headers={['Name', 'Address', 'Region', 'Actions']}>
          {storeList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((store, idx) => (
              <TableRow key={idx}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.region}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setStoreRecord(store);
                      setShowDetail(true);
                    }}
                    className={classes.marginBtn}
                    text="DETAIL"
                    color="default"
                  />
                  <Button
                    onClick={() => {
                      setStoreRecord(store);
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
                      setStoreRecord(store);
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
          count={storeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
      {showAdd && <Add show={showAdd} setShow={setShowAdd} />}
      {showDetail && <Detail show={showDetail} setShow={setShowDetail} store={storeRecord} />}
      {showEdit && <Edit show={showEdit} setShow={setShowEdit} store={storeRecord} />}
      {showDelete && <Delete show={showDelete} setShow={setShowDelete} store={storeRecord} />}
    </Layout>
  );
};

export default Stores;
