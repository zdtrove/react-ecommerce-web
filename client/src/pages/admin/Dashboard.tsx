import { TableCell, TableRow } from '@material-ui/core';
import Layout from 'components/admin/layouts';
import { useEffect } from 'react';
import { dashboardActions, selectDashboards } from 'redux/features/dashboard/slice';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { Table, TableHeader } from 'components/UI';
import { ROUTES } from 'constants/index';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const dashboards = useAppSelector(selectDashboards);

  useEffect(() => {
    if (Object.keys(dashboards).length === 0) {
      dispatch(dashboardActions.getDashboards());
    }
  }, []);

  return (
    <Layout>
      <TableHeader
        title="Users"
        subtitle="List Users"
        route={ROUTES.admin.users}
        icon={<GroupRoundedIcon />}
      />
      <Table headers={['Full Name', 'Email', 'Phone', 'Role']}>
        {dashboards?.users?.map((user) => (
          <TableRow key={user._id}>
            <TableCell align="left">{user.fullName}</TableCell>
            <TableCell align="left">{user.email}</TableCell>
            <TableCell align="left">{user.phone}</TableCell>
            <TableCell align="left">{user.role}</TableCell>
          </TableRow>
        ))}
      </Table>
      <TableHeader
        title="Products"
        subtitle="List Products"
        route={ROUTES.admin.products}
        icon={<ShoppingCartIcon />}
      />
      <Table headers={['Name', 'Description', 'Price']}>
        {dashboards?.products?.map((product) => (
          <TableRow key={product._id}>
            <TableCell align="left">{product.name}</TableCell>
            <TableCell align="left">{product.description}</TableCell>
            <TableCell align="left">{product.price}</TableCell>
          </TableRow>
        ))}
      </Table>
      <TableHeader
        title="Category"
        subtitle="List Category"
        route={ROUTES.admin.categories}
        icon={<CategoryRoundedIcon />}
      />
      <Table headers={['Name']}>
        {dashboards?.categories?.map((category) => (
          <TableRow key={category._id}>
            <TableCell align="left">{category.name}</TableCell>
          </TableRow>
        ))}
      </Table>
      <TableHeader
        title="Event"
        subtitle="List Event"
        route={ROUTES.admin.events}
        icon={<EventNoteIcon />}
      />
      <Table headers={['Name', 'Description', 'Start Date', 'End Date']}>
        {dashboards?.events?.map((event) => (
          <TableRow key={event._id}>
            <TableCell align="left">{event.name}</TableCell>
            <TableCell align="left">{event.description}</TableCell>
            <TableCell align="left">{event.startDate}</TableCell>
            <TableCell align="left">{event.endDate}</TableCell>
          </TableRow>
        ))}
      </Table>
      <TableHeader
        title="Store"
        subtitle="List Store"
        route={ROUTES.admin.stores}
        icon={<StoreMallDirectoryIcon />}
      />
      <Table headers={['Name', 'Address', 'Region']}>
        {dashboards?.stores?.map((store) => (
          <TableRow key={store._id}>
            <TableCell align="left">{store.name}</TableCell>
            <TableCell align="left">{store.address}</TableCell>
            <TableCell align="left">{store.region}</TableCell>
          </TableRow>
        ))}
      </Table>
    </Layout>
  );
};

export default Dashboard;
