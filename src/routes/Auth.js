import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { authService } from 'fbase';
import React from 'react';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter,faGoogle,faGithub } from '@fortawesome/free-brands-svg-icons';
const Auth = () => {
  const onSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider(); //소셜 로그인 서비스 제공 업체
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider); //소셜 로그인 처리,비동기작업 async-await문
    console.log(data);
  };
  return (
    <div className='authContainer'>
      <div className='authTitle'>
        <h3>
          <FontAwesomeIcon icon={faTwitter} color={'#FFFFFF'} size='3x' />
          Nwitter
        </h3>
      </div>
      <AuthForm />
      <div className='authBtns'>
        <button name='google' onClick={onSocialClick} className="socialLogin google">
       Continue with  <FontAwesomeIcon icon={faGoogle} color={"#DB4437"}/>
        </button>
        <button name='github' onClick={onSocialClick} className="socialLogin git">
          Continue with  <FontAwesomeIcon icon={faGithub}/>
        </button>
      </div>
    </div>
  );
};
export default Auth;
