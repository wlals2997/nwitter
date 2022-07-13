import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
//import firebase from 'firebase/compat/app';
import { authService } from '../fbase';

function App() {
  const [init, setIniit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj,setUserObj]=useState(null); //userObj의 출발점
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user)
      } else {
        setIsLoggedIn(false);
      }
      setIniit(true);//어플리케이션이 언제 시작해도 onAuthStateChanged가 실행되야 한다.
    }); //사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킨다.
  }, []);
const refreshUser=async()=>{ //fileupdate
  const user=authService.currentUser;
  //setUserObj(authService.currentUser);//firebase로 profile을 업데이트 해줘야한다.
  setUserObj({...user})
}
  return (
    <>
     {init? ( <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} />) :("Initializing...")} 
      {/* <footer>&copy; {new Date().getFullYear()}Nwitter</footer> */}
    </>
  );
}

export default App;
