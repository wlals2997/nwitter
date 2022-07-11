import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, 'nweets'));
  //   dbNweets.forEach((doc) => {
  //     const nweetObject = {
  //       ...doc.data(),
  //       id: doc.id,

  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //      console.log(doc.data())
  //   });
  // }; 구식방법
  useEffect(() => {
    //실시간으로 데이터를 데이터베이스에서 가져오기
    const q = query(collection(dbService, 'nweets'));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log(nweetArr)
      setNweets(nweetArr);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'nweets'), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setNweet('');
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };
  console.log(nweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type='text'
          placeholder="What's happening?"
          maxLength={120}
        ></input>
        <input type='submit' value='Nweet'></input>
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>
        ))}
      </div>
    </>
  );
};

export default Home;
