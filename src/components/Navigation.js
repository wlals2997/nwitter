import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Navigation = ({ userObj }) => (
  <nav className='navContainer'>
    <ul className='navMenu'>
      <li className='navList twiiter'>
        <Link to='/'>
          <FontAwesomeIcon icon={faTwitter} color={'#FFFFFF'} size='2x' />
        </Link>
      </li>
      <li className='navList profile'>
        <Link to='/profile' className='userProfile'>
        <FontAwesomeIcon icon={faUser} color={'#FFFFFF'} size='2x' />
          {userObj.displayName==null ? userObj.name :userObj.displayName}
          </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
