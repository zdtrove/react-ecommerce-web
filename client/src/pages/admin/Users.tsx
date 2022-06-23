import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import LayoutAdmin from 'components/admin/layouts/LayoutAdmin';
import { Input, Button, Dialog } from 'components/UI';
import { deleteUser } from 'redux/actions/user.action';
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
import UserDetail from 'components/admin/user/UserDetail';
import UserEdit from 'components/admin/user/UserEdit';
import UserAdd from 'components/admin/user/UserAdd';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { RootState } from 'redux/reducers/root.reducer';
import { User } from 'constants/types';

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

const Users = () => {
  const { user } = useSelector((state: RootState) => state);
  const { users } = user;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [showUserAdd, setShowUserAdd] = useState(false);
  const [userRecord, setUserRecord] = useState<User>({} as User);

  useEffect(() => {
    // dispatch(getUsers()).then((users: User[]) => setAllUsers(users));
  }, [dispatch]);

  const onPageChange = (e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let usersFilter;

    if (value) {
      usersFilter = allUsers.filter((user) => user.fullname.toLowerCase().includes(value));
    } else {
      usersFilter = users;
    }

    setAllUsers(usersFilter);
  };

  const handleDeleteUser = async (id: string) => {
    await dispatch(deleteUser(id));
    setShowUserDelete(false);
  };

  return (
    <LayoutAdmin>
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <PeopleOutlineTwoToneIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Users
            </Typography>
            <Typography variant="subtitle2" component="div">
              List Users
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper className={classes.rootTable}>
        {allUsers && (
          <TableContainer>
            <Toolbar className={classes.tableAction}>
              <Input
                label="Search Users"
                startIcon={<SearchIcon />}
                onChange={handleSearch}
                margin="none"
                value={''}
              />
              <Button
                onClick={() => setShowUserAdd(true)}
                variant="outlined"
                startIcon={<AddIcon />}
                text="ADD NEW"
              />
            </Toolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{user.fullname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setUserRecord(user);
                            setShowUserDetail(true);
                          }}
                          className={classes.marginBtn}
                          text="DETAIL"
                          color="default"
                        />
                        <Button
                          onClick={() => {
                            setUserRecord(user);
                            setShowUserEdit(true);
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
                            setShowUserDelete(true);
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
              count={allUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              ActionsComponent={TablePaginationActions}
            />
          </TableContainer>
        )}
      </Paper>
      {showUserAdd && (
        <UserAdd
          {...{
            showUserAdd,
            setShowUserAdd
          }}
        />
      )}
      {showUserDetail && (
        <UserDetail
          {...{
            showUserDetail,
            setShowUserDetail,
            userRecord
          }}
        />
      )}
      {showUserEdit && (
        <UserEdit
          {...{
            showUserEdit,
            setShowUserEdit,
            userRecord
          }}
        />
      )}
      {showUserDelete && (
        <Dialog show={showUserDelete} setShow={setShowUserDelete} title="DELETE USER">
          <DialogContent>
            <DialogContentText>
              Are you sure to delete <strong>{userRecord?.fullname}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteUser(userRecord?._id || '')}
              color="secondary"
              text="DELETE"
            />
            <Button onClick={() => setShowUserDelete(false)} color="default" text="CANCEL" />
          </DialogActions>
        </Dialog>
      )}
    </LayoutAdmin>
  );
};

export default Users;
