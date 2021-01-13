import React from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';

import { Button } from '@material-ui/core';

import { provider, auth } from './firebase';
import { login } from './features/appSlice';

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid
          })
        );
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://kit.snapchat.com/images/docs/design-guidelines/ghostlogo@2x.png'
          alt=''
        />
        <Button variant='outlined' onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Login;