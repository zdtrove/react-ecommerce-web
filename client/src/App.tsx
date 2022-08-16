import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from 'pages/Login';
import LoginAdmin from 'pages/admin/Login';
import CategoriesAdmin from 'pages/admin/Categories';
import UsersAdmin from 'pages/admin/Users';
import ProductsAdmin from 'pages/admin/Products';
import EventsAdmin from 'pages/admin/Events';
import StoresAdmin from 'pages/admin/Stores';
import SettingsAdmin from 'pages/admin/Settings';
import NotFound from 'pages/NotFound';
import Home from 'pages/Home';
import Register from 'pages/Signup';
import { Snackbar, Backdrop } from 'components/UI';
import Dashboard from 'pages/admin/Dashboard';
import PrivateRoute from 'components/PrivateRoute';
import { ROUTES } from 'constants/index';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { authActions } from 'redux/features/auth/slice';
import CategoryPage from 'pages/Category';
import Cart from 'components/cart';
import ProductPage from 'pages/Product';
import WishlistPage from 'pages/Wishlist';
import UseScrollToTop from 'hooks/useScrollToTop';
import { productActions, selectProducts } from 'redux/features/product/slice';
import { categoryActions, selectCategories } from 'redux/features/category/slice';
import './styles.css';
import { selectUsers, userActions } from 'redux/features/user/slice';
import LightBox from 'components/LightBox';
import LoadingBar from 'react-top-loading-bar';
import { selectProgress } from 'redux/features/ui/slice';

function App() {
  const dispatch = useAppDispatch();
  const { getProducts } = productActions;
  const { getCategories } = categoryActions;
  const { getUsers } = userActions;
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const users = useAppSelector(selectUsers);
  const progress = useAppSelector(selectProgress);

  useEffect(() => {
    dispatch(authActions.getLoggedUser());
    !users.length && dispatch(getUsers());
    !categories.length && dispatch(getCategories());
    !products.length && dispatch(getProducts());
    console.log(`Last Updated: ${new Date('2022-08-15')}`);
  }, []);

  return (
    <Router>
      <UseScrollToTop />
      <Switch>
        {/* User */}
        <Route exact path={ROUTES.home.index} component={Home} />
        <Route path={ROUTES.home.login} component={Login} />
        <Route path={ROUTES.home.signUp} component={Register} />
        <Route path={ROUTES.home.category} component={CategoryPage} />
        <Route path={ROUTES.home.product} component={ProductPage} />
        <PrivateRoute path={ROUTES.home.wishlist} component={WishlistPage} />
        {/* Admin */}
        <PrivateRoute admin exact path={ROUTES.admin.index} component={Dashboard} />
        <PrivateRoute admin exact path={ROUTES.admin.categories} component={CategoriesAdmin} />
        <PrivateRoute admin exact path={ROUTES.admin.users} component={UsersAdmin} />
        <PrivateRoute admin exact path={ROUTES.admin.products} component={ProductsAdmin} />
        <PrivateRoute admin exact path={ROUTES.admin.events} component={EventsAdmin} />
        <PrivateRoute admin exact path={ROUTES.admin.stores} component={StoresAdmin} />
        <PrivateRoute admin exact path={ROUTES.admin.settings} component={SettingsAdmin} />
        <Route path={ROUTES.admin.login} component={LoginAdmin} />
        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
      <Cart />
      <Snackbar />
      <Backdrop />
      <LightBox />
      <LoadingBar color="#00ff1b" progress={progress} height={4} loaderSpeed={2000} />
    </Router>
  );
}

export default App;
