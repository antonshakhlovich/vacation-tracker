import './App.css';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useState, useEffect, useRef} from 'react';

function App() {
  const [vac, setVac] = useState({balance: "Loading..."});
  const [profile, setProfile] = useState(null);
  const {
    REACT_APP_GOOGLE_SHEET_ID,
    REACT_APP_GOOGLE_PRIVATE_KEY,
    REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    REACT_APP_OATH_CLIENT_ID
  } = process.env;
  const clientId = REACT_APP_OATH_CLIENT_ID;
  const rows = useRef([]);

  useEffect(() => {
    const doc = new GoogleSpreadsheet(REACT_APP_GOOGLE_SHEET_ID);

    async function getData() {
      setVac({balance: "Loading..."})
      await doc.useServiceAccountAuth({
        client_email: REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      });
      await doc.getInfo();
      const sheet = doc.sheetsByIndex[0];
      rows.current = await sheet.getRows();
      setVac(rows.current.find(x => x.email === profile?.email) ?? {balance: "No Data"})
    }
    getData();

    const initClient = () => {
      gapi.auth2.init({
          clientId: clientId,
          scope: 'email'
      });
    };
    gapi.load('client:auth2', initClient);
  }, [])

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    setVac(rows.current.find(x => x.email === res.profileObj.email) ?? {balance: "No Data"})
  };

  const onFailure = (err) => {
      console.log('failed', err);
  };

  const logOut = () => {
      setProfile(null);
  };

  return (
    <div className="App">
      <header className="App-header">
      {profile ? (
      <div>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <p>Balance: {vac.balance}</p>
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
      </div>
      ) : (
      <GoogleLogin
          clientId={clientId}
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
