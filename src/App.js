import './App.css';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useState, useEffect} from 'react';
import logo from './logo-white.svg';

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
  const {
    REACT_APP_GOOGLE_SHEET_ID,
    REACT_APP_GOOGLE_PRIVATE_KEY,
    REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    REACT_APP_OATH_CLIENT_ID
  } = process.env;

  const doc = new GoogleSpreadsheet(REACT_APP_GOOGLE_SHEET_ID);

  async function getRows() {
    await doc.useServiceAccountAuth({
      client_email: REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    });
    await doc.getInfo();
    const sheet = doc.sheetsByIndex[0];
    return sheet.getRows();
  }

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
          clientId: REACT_APP_OATH_CLIENT_ID,
          scope: 'email'
      });
    };
    gapi.load('client:auth2', initClient);
  }, [REACT_APP_OATH_CLIENT_ID])

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    setVac(states.loading);
    getRows()
    .then(rows => {
      setVac(rows.find(x => x.email === res.profileObj.email) ?? {balance: "No Data"})
    })
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
          <GoogleLogout clientId={REACT_APP_OATH_CLIENT_ID} buttonText="Log out" onLogoutSuccess={logOut} />
      </div>
      ) : (
      <GoogleLogin
          clientId={REACT_APP_OATH_CLIENT_ID}
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
