import { useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Login from './pages/Login';
import LoginAdmin from './pages/admin/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';
import { Snackbar, Backdrop } from './components/UI'
import Dashboard from './pages/admin/Dashboard';
import { refreshToken } from './redux/actions/auth.action'
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
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