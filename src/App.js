import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useState, useEffect} from 'react';
import logo from './logo-white.svg';
import DocHelper from './util/DocHelper';

function App(props) {
  const states = {
    loading: {
      balance: "Loading..."
    },
    noData: {
      balance: "No data."
    },
    failed: {
      balance: "Failed to retrieve data."
    }
  }

  const [vac, setVac] = useState(states.loading);
  const [profile, setProfile] = useState(null);
  const docHelper = new DocHelper();

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
          clientId: process.env.REACT_APP_OATH_CLIENT_ID,
          scope: 'email'
      });
    };
    gapi.load('client:auth2', initClient);
  }, [])

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    setVac(states.loading);
    updateBalance(res);
    //console.log(res.tokenId);
  };

  const updateBalance = async (res) => {
    if(docHelper.isReady) {
      docHelper.getRowsBySheetName("BalancePublic")
      .then(rows => {
        setVac(rows.find(x => docHelper.getUserByMd5(x.md5).email === res.profileObj.email) ?? states.noData)
      })
    } else {
      await docHelper.init();
      updateBalance(res);
    }
  }

  const updateBalanceV2 = (tokenId) => {
    const url = 'http://localhost:8080?id_token=' + tokenId;
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  const onFailure = (err) => {
      console.log('failed', err);
      setVac(states.failed);
  };

  const logOut = () => {
      setProfile(null);
      setVac(states.loading);
  };

  return (
    <div className="App">
      <div className="App-logo">
        <img className="App-logo" src={logo} alt="SiliconMint"/>
      </div>
      <header className="App-header">
      {profile ? (
      <div>
          <p>
            <span className="App-label">Name:</span>
            <span className="App-value">{profile.name}</span>
          </p>
          <p>
            <span className="App-label">Email:</span>
            <span className="App-value">{profile.email}</span>
          </p>
          <p>
            <span className="App-label">Balance:</span>
            <span className="App-value">{vac.balance}</span>
          </p>
          <p>
            <span className="App-label">Sick Leaves Used Last Year:</span>
            <span className="App-value">{vac.sickLastYear}</span>
          </p>
          <p>
            <span className="App-label">Vac Used Last Year:</span>
            <span className="App-value">{vac.vacLastYear}</span>
          </p>
          <p>
            <a href={process.env.REACT_APP_FORM_LINK} target="_blank" rel="noreferrer" className="App-button">Submit New Request</a>
          </p>
          <GoogleLogout clientId={process.env.REACT_APP_OATH_CLIENT_ID} buttonText="Log out" onLogoutSuccess={logOut} />
      </div>
      ) : (
      <GoogleLogin
          clientId={process.env.REACT_APP_OATH_CLIENT_ID}
          buttonText="Sign in with Google"
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
