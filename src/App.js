import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
