import React from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);
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
  return (
    <>
      <form onSubmit={onSubmit} className='container'>
        <input
          name='email'
          type='email'
          placeholder='Write your E-mail'
          required
          value={email}
          onChange={onChange}
          className='authInput'
        ></input>
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className='authInput'
        ></input>
        <input
          type='submit'
          value={newAccount ? 'Sign up for Nwitter' : 'Log In'}
          className='loginBtn'
        ></input>
        {error}
      </form>
      <span onClick={toggleAccount} className='signInBtn'>
        {newAccount ? 'Log In' : 'Sign up for Nwitter'}
      </span>
    </>
  );
};
export default AuthForm;
