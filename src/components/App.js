import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
//import firebase from 'firebase/compat/app';
import { authService } from '../fbase';
function App() {
  const [init, setIniit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIniit(true);
    }); //사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킨다.
  }, []);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
