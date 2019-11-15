import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import logo from '../logo.svg';
import '../styles/App.css';
import Header from './Header.js';
import LinkList from './LinkList.js';
import CreateLink from './CreateLink.js';
import PersonList from './PersonList.js';
import Login from './Login.js';
import Search from './Search';
import LinkCard from './LinkCard';


function App(props) {
  return (
    <div className="center w85">
      <Header/>
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1"/>}/>
            <Route exact path="/top" component={LinkList}/>
            <Route exact path="/new/:page" component={LinkList}/>
            <Route exact path="/people" component={PersonList}/>
            <Route exact path='/create' component={CreateLink}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/card' render={(props) => (<LinkCard {...props} />)} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
