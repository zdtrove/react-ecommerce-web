import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import Layout from 'components/admin/layouts';
import { Input, Button, Dialog, Table, TableHeader, TablePaginationActions } from 'components/UI';
import {
  Paper,
  makeStyles,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
  Toolbar,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Detail from 'components/admin/user/Detail';
import Edit from 'components/admin/user/Edit';
import Add from 'components/admin/user/Add';
import { User } from 'types/user';
import { userActions, selectUsers } from 'redux/features/user/slice';

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

const Users = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const users = useAppSelector(selectUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [userRecord, setUserRecord] = useState<User>({} as User);
  const [userList, setUserList] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const onPageChange = (e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleDeleteUser = (id: string) => {
    dispatch(userActions.deleteUser(id));
    setShowDelete(false);
  };

  useEffect(() => {
    setUserList(users);
  }, [users]);

  useEffect(() => {
    if (!users.length) {
      dispatch(userActions.getUsers());
    }
  }, []);

  useEffect(() => {
    setPage(0);
    setUserList(
      users.filter((user: User) => user.fullName.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [searchValue]);

  return (
    <Layout>
      <TableHeader title="Users" subtitle="List Users" icon={<GroupRoundedIcon />} />
      <TableContainer className={classes.rootTable} component={Paper}>
        <Toolbar className={classes.tableAction}>
          <Input
            label="Search Users"
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
        <Table headers={['Full Name', 'Email', 'Phone', 'Role', 'Actions']}>
          {userList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user: User, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setUserRecord(user);
                      setShowDetail(true);
                    }}
                    className={classes.marginBtn}
                    text="DETAIL"
                    color="default"
                  />
                  <Button
                    onClick={() => {
                      setUserRecord(user);
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
                      setUserRecord(user);
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
          count={userList.length}
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
            showAdd,
            setShowAdd
          }}
        />
      )}
      {showDetail && (
        <Detail
          {...{
            showDetail,
            setShowDetail,
            userRecord
          }}
        />
      )}
      {showEdit && (
        <Edit
          {...{
            showEdit,
            setShowEdit,
            userRecord
          }}
        />
      )}
      {showDelete && (
        <Dialog show={showDelete} setShow={setShowDelete} title="DELETE USER">
          <DialogContent>
            <DialogContentText>
              Are you sure to delete <strong>{userRecord?.fullName}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteUser(userRecord?._id!)}
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

export default Users;
