import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Navigation = ({ userObj }) => (
  <nav className='navContainer'>
    <ul className='navMenu'>
      <li className='navList'>
        <Link to='/'>
          <FontAwesomeIcon icon={faTwitter} color={'#FFFFFF'} size='2x' />
        </Link>
      </li>
      <li className='navList profile'>
        <Link to='/profile'>{userObj.displayName}님의 프로필</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
