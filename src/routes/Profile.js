import { authService, dbService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where,orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const Profile = ({ userObj,refreshUser }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
    
  };
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', `${userObj.uid}`),
      orderBy("createdAt","desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
    }//1. firebase에 있는 profile을 업데이트 시켜준 후에
    refreshUser();//2. react.js에 있는 profile을 새로고침 해준다.
  };
  useEffect(() => {
    getMyNweets();
  }, [userObj]);
  return (
    <div className='nwitContainer userProfileChange'>
      <form onSubmit={onSubmit} className="profileContainer">
        <input
          type='text'
          placeholder='Display Name'
          onChange={onChange}
          value={newDisplayName}
          className="profileInput"
        />
        <input type='submit' value='Update' className='profileInputBtn' />
      </form>
      <button onClick={onLogOutClick} className="logoutBtn">Log Out</button>
    </div>
  );
};
export default Profile;
