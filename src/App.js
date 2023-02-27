import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo-white.svg';

function App() {
  const userStates = {
    loading: {
      name: 'Loading...',
    },
    noData: {
      name: 'No data.',
    },
    failed: {
      name: 'Failed to retrieve data.',
    },
  };

  const [user, setUser] = useState(null);

  useEffect(() => {}, []);

  const getUserData = (tokenId) => {
    fetch(getUserDataUrl(tokenId))
      .then((response) => response.json())
      .then((data) => setUser(data.personalBalance));
  };

  const getUserDataUrl = (tokenId) => {
    let baseUrl = 'https://user-data-vzzdzjkoiq-lm.a.run.app';
    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:8080';
    }
    return `${baseUrl}?id_token=${tokenId}`;
  };

  const onSuccess = (res) => {
    setUser(userStates.loading);
    getUserData(res.credential);
  };

  const onFailure = (err) => {
    console.log('failed', err);
    setUser(userStates.failed);
    logOut();
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <div className='App'>
      <div className='App-logo'>
        <img className='App-logo' src={logo} alt='SiliconMint' />
      </div>
      <header className='App-header'>
        <div>
          {user ? (
            <Fragment>
              <p>
                <span className='App-label'>Name:</span>
                <span className='App-value'>{user.name}</span>
              </p>
              <p>
                <span className='App-label'>Email:</span>
                <span className='App-value'>{user.email}</span>
              </p>
              <p>
                <span className='App-label'>Balance:</span>
                <span className='App-value'>{user.vacationBalance}</span>
              </p>
              <p>
                <span className='App-label'>Sick Leaves Used Last Year:</span>
                <span className='App-value'>{user.sickDaysUsedLastYear}</span>
              </p>
              <p>
                <span className='App-label'>Vac Used Last Year:</span>
                <span className='App-value'>{user.vacationUsedLastYear}</span>
              </p>
              <p>
                <a
                  href={process.env.REACT_APP_FORM_LINK}
                  target='_blank'
                  rel='noreferrer'
                  className='App-button'
                >
                  Submit New Request
                </a>
              </p>
              <button className='App-button App-button--reversed' onClick={logOut}>
                Log Out
              </button>
            </Fragment>
          ) : (
            <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} useOneTap />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
