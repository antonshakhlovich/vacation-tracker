import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import React, { useState, useEffect } from 'react';
import logo from './logo-white.svg';

function App() {
  const states = {
    loading: {
      vacationBalance: 'Loading...',
    },
    noData: {
      vacationBalance: 'No data.',
    },
    failed: {
      vacationBalance: 'Failed to retrieve data.',
    },
  };

  const [vac, setVac] = useState(states.loading);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_OATH_CLIENT_ID,
        scope: 'email',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const getUserData = (tokenId) => {
    const url = 'https://user-data-vzzdzjkoiq-lm.a.run.app?id_token=' + tokenId;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const balance = data.find((x) => x.name === 'balance').values[0];
        setVac(balance);
      });
  };

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    setVac(states.loading);
    getUserData(res.tokenId);
  };

  const onFailure = (err) => {
    console.log('failed', err);
    setVac(states.failed);
  };

  const logOut = () => {
    setProfile(null);
    setVac(states.loading);
  };

  return (
    <div className='App'>
      <div className='App-logo'>
        <img className='App-logo' src={logo} alt='SiliconMint' />
      </div>
      <header className='App-header'>
        {profile ? (
          <div>
            <p>
              <span className='App-label'>Name:</span>
              <span className='App-value'>{profile.name}</span>
            </p>
            <p>
              <span className='App-label'>Email:</span>
              <span className='App-value'>{profile.email}</span>
            </p>
            <p>
              <span className='App-label'>Balance:</span>
              <span className='App-value'>{vac.vacationBalance}</span>
            </p>
            <p>
              <span className='App-label'>Sick Leaves Used Last Year:</span>
              <span className='App-value'>{vac.sickDaysUsedLastYear}</span>
            </p>
            <p>
              <span className='App-label'>Vac Used Last Year:</span>
              <span className='App-value'>{vac.vacationUsedLastYear}</span>
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
            <GoogleLogout
              clientId={process.env.REACT_APP_OATH_CLIENT_ID}
              buttonText='Log out'
              onLogoutSuccess={logOut}
            />
          </div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_OATH_CLIENT_ID}
            buttonText='Sign in with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        )}
      </header>
    </div>
  );
}

export default App;
