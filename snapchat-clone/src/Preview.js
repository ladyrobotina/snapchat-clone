import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Preview.css';
import { useHistory } from 'react-router-dom';
import { selectCameraImage, resetCameraImage } from './features/cameraSlice';
import CloseIcon from '@material-ui/icons/Close';
import NoteIcon from '@material-ui/icons/Note';
import CreateIcon from '@material-ui/icons/Create';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { storage, db } from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    // deploy firebase storege
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, 'data_url');

    uploadTask.on(
      'state_changed',
      null,
      error => {
        // error funtion
        console.log(error);
      },
      () => {
        // complete
        storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then(url => {
            db.collection('posts').add({
              imageUrl: url,
              username: user.displayName,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace('/chats');
          });
      }
    );
  };

  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='preview__close' />
      <div className='preview__toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt='' />
      <div onClick={sendPost} className='preview__footer'>
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='preview__sendIcon' />
      </div>
    </div>
  );
}

export default Preview;
