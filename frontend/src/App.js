import React from 'react';
import {Container} from '@material-ui/core';
//import useStyles from './style';
import NavBar from './component/NavBar/NavBar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  //const classes  = useStyles();

  return (
    <Router>
      <Container maxWidth="lg" >
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App;