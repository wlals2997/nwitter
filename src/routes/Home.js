import Nweet from 'components/Nweet';
import { dbService, storageService } from 'fbase';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef(); //선택했던 첨부파일명 없애기 위해 useRef훅 사용
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
    let attachmentUrl = '';
    if (attachment != '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      attachmentUrl = await getDownloadURL(
        ref(storageService, attachmentRef)
      );
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    try {
      const docRef = await addDoc(collection(dbService, 'nweets'), nweetObj);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setNweet('');
    setAttachment('');
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNweet(value);
  };
  // console.log(nweets);
  const onFileChange = (e) => {
    //이미지 불러오기
    // console.log(e.target.files)
    const { files } = e.target;
    const theFile = files[0]; //1. 파일을 가지고 reader를 만든다음
    const reader = new FileReader(); //2. 파일의 내용을 읽고 사용자의컴퓨터에 저장하는 것을 가능하게 해준다.
    reader.onloadend = (finishedEvent) => {
      //4. 읽기가 완료됐을 때 실행되는 이벤트핸들러
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); //3. readAsDataURL을 사용해서 파일을 읽는다.
  };
  const onClearAttachment = () => {
    setAttachment(null); //첨부파일 url 넣는 state 비워서 프리뷰 img src 없애기
    fileInput.current.value = null; //선택했던 첨부파일명 없애기
  };
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
        <input
          type='file'
          accept='image/*'
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type='submit' value='Nweet'></input>
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
