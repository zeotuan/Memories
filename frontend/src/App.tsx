import React from 'react';
import {Container} from '@material-ui/core';
//import useStyles from './style';
import NavBar from './component/NavBar/NavBar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import PostDetails from './component/PostDetails/PostDetails';
import './index.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import getUserFromStorage from './utils/userExtractor';
const App = () => {
  //const classes  = useStyles();
  const user = getUserFromStorage();
  
  return (
    <Router>
      <Container maxWidth="xl" >
        <NavBar />
        <Switch>
          <Route exact path="/" component={()=> <Redirect to="/posts"/>} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/posts/search" component={Home} />
          <Route exact path="/posts/:id" component={PostDetails} />
          <Route exact path="/auth" component={() => {return user? <Redirect to="/posts" /> : <Auth />; }} />

        </Switch>
      </Container>
    </Router>
  );
};

export default App;