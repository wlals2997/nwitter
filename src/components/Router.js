import React, { useState } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn,userObj }) => {
  return (//&&:navigation이 존재하려면 이것이 true여야 한다.
    <Router>
     {isLoggedIn && <Navigation/>} 
      <Switch>
        {isLoggedIn ? ( //로그인이 된 상태
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
           {/* <Redirect from='*' to="/"/> */}
          </>
        ) : (
          //로그인이 되어있지 않는상태
          <>
          <Route exact path='/'>
            <Auth />
          </Route>
          {/* <Redirect from='*' to="/"/>    */}
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
