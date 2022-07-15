import {
  Card,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import Layout from 'components/admin/layouts';
import { useEffect, useState } from 'react';
import { dashboardActions, selectDashboards } from 'redux/features/dashboard/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { User } from 'types/user';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Product } from 'types/product';
import { Category } from 'types/category';
import { Event } from 'types/event';
import { Store } from 'types/store';
import { Button } from 'components/UI';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/index';

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    padding: theme.spacing(2),
    minWidth: 240,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  header: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    },
    display: 'flex'
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
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const dashboards = useAppSelector(selectDashboards);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    dispatch(dashboardActions.getDashboards());
  }, []);

  useEffect(() => {
    if (dashboards.length) {
      setUsers(dashboards[0].users);
      setProducts(dashboards[0].products);
      setCategories(dashboards[0].categories);
      setEvents(dashboards[0].events);
      setStores(dashboards[0].stores);
    }
  }, [dashboards]);

  return (
    <Layout>
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
        <Button text="View all" onClick={() => history.push(ROUTES.admin.users)} />
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">{user.fullName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <PeopleOutlineTwoToneIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Products
            </Typography>
            <Typography variant="subtitle2" component="div">
              List Products
            </Typography>
          </div>
        </div>
        <Button text="View all" onClick={() => history.push(ROUTES.admin.products)} />
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <PeopleOutlineTwoToneIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Category
            </Typography>
            <Typography variant="subtitle2" component="div">
              List Category
            </Typography>
          </div>
        </div>
        <Button text="View all" onClick={() => history.push(ROUTES.admin.categories)} />
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell align="left">{category.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <PeopleOutlineTwoToneIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Event
            </Typography>
            <Typography variant="subtitle2" component="div">
              List Event
            </Typography>
          </div>
        </div>
        <Button text="View all" onClick={() => history.push(ROUTES.admin.events)} />
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell align="left">{event.name}</TableCell>
                <TableCell align="left">{event.description}</TableCell>
                <TableCell align="left">{event.startDate}</TableCell>
                <TableCell align="left">{event.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Paper className={classes.rootHeader}>
        <div className={classes.header}>
          <Card className={classes.headerIcon}>
            <PeopleOutlineTwoToneIcon />
          </Card>
          <div className={classes.headerTitle}>
            <Typography variant="h6" component="div">
              Store
            </Typography>
            <Typography variant="subtitle2" component="div">
              List Store
            </Typography>
          </div>
        </div>
        <Button text="View all" onClick={() => history.push(ROUTES.admin.stores)} />
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store._id}>
                <TableCell align="left">{store.name}</TableCell>
                <TableCell align="left">{store.address}</TableCell>
                <TableCell align="left">{store.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Dashboard;
