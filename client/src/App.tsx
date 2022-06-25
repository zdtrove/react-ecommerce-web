import { useEffect } from 'react';
import 'App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'pages/Login';
import LoginAdmin from 'pages/admin/Login';
import CategoriesAdmin from 'pages/admin/Categories';
import UsersAdmin from 'pages/admin/Users';
import NotFound from 'pages/NotFound';
import Home from 'pages/Home';
import Register from 'pages/Signup';
// import { Snackbar, Backdrop } from 'components/UI';
import Dashboard from 'pages/admin/Dashboard';
import PrivateRoute from 'components/PrivateRoute';
import { ROUTES } from 'constants/index';
import { useAppDispatch } from 'redux/hook';
import { authActions } from 'redux/features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  console.log(`Last Updated: ${new Date('2022-06-21')}`);

  useEffect(() => {
    dispatch(authActions.getLoggedUser());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {/* User */}
        <PrivateRoute exact path={ROUTES.home.index} component={Home} />
        <Route path={ROUTES.home.login} component={Login} />
        <Route path={ROUTES.home.signUp} component={Register} />
        {/* Admin */}
        <PrivateRoute admin exact path={ROUTES.admin.index} component={Dashboard} />
        <PrivateRoute admin exact path={ROUTES.admin.categories} component={CategoriesAdmin} />
        <PrivateRoute admin exact path={ROUTES.admin.users} component={UsersAdmin} />
        <Route path={ROUTES.admin.login} component={LoginAdmin} />
        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
      {/* <Snackbar />
      <Backdrop /> */}
    </Router>
  );
}

export default App;
