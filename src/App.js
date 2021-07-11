import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import store from './redux/store'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';
import { Snackbar, Backdrop } from './components/UI'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
        <Snackbar />
        <Backdrop />
      </Router>
    </Provider>
  );
}

export default App;
