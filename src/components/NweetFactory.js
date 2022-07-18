import React from 'react';
import { dbService, storageService } from 'fbase';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
const NweetFactory = ({ userObj }) => {
  //nweets 생성 담당
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef(); //선택했던 첨부파일명 없애기 위해 useRef훅 사용
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
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
    if(Boolean(theFile)){
      reader.readAsDataURL(theFile); //3. readAsDataURL을 사용해서 파일을 읽는다.
    }
    
  };
  const onClearAttachment = () => {
    setAttachment(""); //첨부파일 url 넣는 state 비워서 프리뷰 img src 없애기
    fileInput.current.value = null; //선택했던 첨부파일명 없애기
  };
  return (
    <div className='posting'>
      <form onSubmit={onSubmit} className='factoryForm'>
        <div>
          <input
            value={nweet}
            onChange={onChange}
            type='text'
            placeholder="What's happening?"
            maxLength={120}
            className='factoryInput__container'
          ></input>
          <label htmlFor='input-file'>
            <FontAwesomeIcon icon={faImage} size='2x' className='imageFile' />
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={onFileChange}
            ref={fileInput}
            id='input-file'
            style={{ display: 'none' }}
          />
        </div>
        <input className='nweetBtn' type='submit' value='Nweet'></input>
        {attachment && (
          <div>
            <img src={attachment} width='200px' height='200px' />
            <button onClick={onClearAttachment}>
              <FontAwesomeIcon icon={faTrashCan} size='1x' />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default NweetFactory;
