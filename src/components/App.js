import React from 'react';
import {Switch, Route} from 'react-router-dom';
import logo from '../logo.svg';
import '../styles/App.css';
import Header from './Header.js';
import LinkList from './LinkList.js';
import CreateLink from './CreateLink.js';
import PersonList from './PersonList.js';
import Login from './Login.js';

// import CreateUser from './CreateUser.js';


function App() {
  return (
    <div className="center w85">
      <Header/>
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={LinkList}/>
            <Route exact path="/people" component={PersonList}/>
            <Route exact path='/create' component={CreateLink}/>
            <Route exact path='/login' component={Login}/>
            {/* <Route exact path="/createuser" component={CreateUser}/> */}
          </Switch>
        </div>
    </div>
  );
}

export default App;
