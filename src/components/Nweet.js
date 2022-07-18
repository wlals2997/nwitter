import { dbService, storageService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteText = doc(dbService, 'nweets', `${nweetObj.id}`);
  const desertRef = ref(storageService, nweetObj.attachmentUrl); //삭제하려는 이미지 파일 가리키는 ref생성
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure?');
    if (ok) {
      try {
        await deleteDoc(deleteText);
        if (nweetObj.attachmentUrl !== '') {
          await deleteObject(desertRef);
        }
      } catch (error) {
        window.alert(error);
      }
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev); //수정 여부가 변경된다.
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(nweetObj, newNweet);
    await updateDoc(deleteText, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };

  return (
    <div className='posting'>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Edit your nweet'
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type='submit' value='update' className='updateBtn' />
          </form>
          <button onClick={toggleEditing} className='cancelBtn'>
            Cancel
          </button>
        </>
      ) : (
        <div className='postingBox'>
          <h4>
            {' '}
            <FontAwesomeIcon icon={faCircleUser} size='2x' color={'#D3D3D3'} className="nweetUserProfile" />
            {userObj.displayName}
          </h4>
          <p>{nweetObj.text}</p>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width='200px' height='200px' />
          )}
          {isOwner && (
            <div className='postBtnContainer'>
              <button onClick={onDeleteClick} className='postBtn delete'>
                Delete Nweet
              </button>
              <button onClick={toggleEditing} className='postBtn edit'>
                Edit Nweet
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Nweet;
