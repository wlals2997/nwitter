import { dbService, storageService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteText = doc(dbService, 'nweets', `/${nweetObj.id}`);
  const desertRef=ref(storageService,nweetObj.attachmentUrl)//삭제하려는 이미지 파일 가리키는 ref생성
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure?');
    if (ok) {
      try{
        await deleteDoc(deleteText);
        await deleteObject(desertRef)
      }
      catch(error){
        window.alert(error)
      }
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev); //수정 여부가 변경된다.
  };
  const onSubmit =async (e) => {
    e.preventDefault();
    console.log(nweetObj,newNweet)
    await updateDoc(deleteText,{
        text:newNweet,
    })
    setEditing(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNewNweet(value);
  };
  return (
    <div>
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
            <input type="submit" value="update"/>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
