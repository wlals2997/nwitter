import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService, storageService } from 'fbase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
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

  return (
    <div className='nwitContainer dd'>
      <NweetFactory userObj={userObj}/>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
