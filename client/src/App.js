import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './pages/Login';
import LoginAdmin from './pages/admin/Login';
import CategoriesAdmin from './pages/admin/Categories';
import UsersAdmin from './pages/admin/Users';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';
import { Snackbar, Backdrop } from './components/UI'
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { getLoggedUser } from './redux/actions/auth.action'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoggedUser())
  }, [dispatch])

  return (
    <Router>
      <Switch>
        {/* User */}
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Admin */}
        <PrivateRoute admin exact path="/admin" component={Dashboard} />
        <PrivateRoute admin exact path="/admin/categories" component={CategoriesAdmin} />
        <PrivateRoute admin exact path="/admin/users" component={UsersAdmin} />
        <Route path="/admin/login" component={LoginAdmin} />
        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
      <Snackbar />
      <Backdrop />
    </Router>
  );
}

export default App;
