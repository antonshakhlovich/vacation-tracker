import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect, Fragment } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
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

  const NOT_APPLICABLE = 'N/A';

  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [balanceOnDate, setBalanceOnDate] = useState(NOT_APPLICABLE);

  useEffect(() => {}, []);

  const getUserData = (tokenId) => {
    fetch(getUserDataUrl(tokenId))
      .then((response) => response.json())
      .then((data) => setUser(data.personalBalance));
  };

  const getUserDataUrl = (tokenId) => {
    const queryParams = new URLSearchParams(window.location.search);
    const isLocal = !!queryParams?.get('local');
    let baseUrl = 'https://user-data-vzzdzjkoiq-lm.a.run.app';
    if (process.env.NODE_ENV === 'development' && isLocal) {
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
    setBalanceOnDate(NOT_APPLICABLE);
  };

  const onDateChanged = (date) => {
    setDate(date);

    if (date <= new Date()) {
      setBalanceOnDate(NOT_APPLICABLE);
      return;
    }

    const balance = Math.round(
      ((new Date(date).getTime() - new Date(user.startDate).getTime()) / (1000 * 3600 * 24) / 365) *
        20 -
        user.vacationUsedTotal,
      0,
    );

    setBalanceOnDate(balance);
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
              <div className='row'>
                <span className='App-label'>Name:</span>
                <span className='App-value'>{user.name}</span>
              </div>
              <div className='row'>
                <span className='App-label'>Email:</span>
                <span className='App-value'>{user.email}</span>
              </div>
              <div className='row'>
                <span className='App-label'>Balance:</span>
                <span className='App-value'>{user.vacationBalance}</span>
              </div>
              <div className='row'>
                <span className='App-label'>Balance On Date:</span>
                <DatePicker selected={date} onChange={onDateChanged}></DatePicker>
                <span className='App-value'>{balanceOnDate}</span>
              </div>
              <div className='row'>
                <span className='App-label'>Sick Leaves Used Last Year:</span>
                <span className='App-value'>{user.sickDaysUsedLastYear}</span>
              </div>
              <div className='row'>
                <span className='App-label'>Vac Used Last Year:</span>
                <span className='App-value'>{user.vacationUsedLastYear}</span>
              </div>
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
