import { async } from '@firebase/util';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { authService, firebaseInstance } from 'fbase';
import React from 'react';
import { useState } from 'react';
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    //사용자가 input에 입력한 값들을 토대로 저장시킨다
    const { name, value } = e.target; //const {target:{name,nalue}}=e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    //Html만을 사용해서 form을 submit하는 모든순간 새로고침이 되지 않도록
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //login
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message.replace('Firebase: ', ''));
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev); //newAccount의 이전값을 가져와서 그 값에 반대되는 것을 리턴한다 (toggle버튼)
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();//소셜 로그인 서비스 제공 업체
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data=await signInWithPopup(authService,provider);//소셜 로그인 처리,비동기작업 async-await문
    console.log(data)
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Write your E-mail'
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        ></input>
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Sign In'}
        ></input>
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}{' '}
      </span>
      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
