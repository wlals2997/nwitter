import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteText = doc(dbService, 'nweets', `/${nweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure?');
    if (ok) {
      await deleteDoc(deleteText);
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
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
