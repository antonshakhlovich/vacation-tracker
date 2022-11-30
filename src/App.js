import './App.css';
import { GoogleSpreadsheet } from "google-spreadsheet";
import {useState, useEffect} from 'react';

function App() {
  const [vac, setVac] = useState({});


  useEffect(() => {
    const {
      REACT_APP_GOOGLE_SHEET_ID, 
      REACT_APP_GOOGLE_PRIVATE_KEY, 
      REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL
    } = process.env;
    const doc = new GoogleSpreadsheet(REACT_APP_GOOGLE_SHEET_ID);

    async function getData() {
      await doc.useServiceAccountAuth({
        client_email: REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      });
      await doc.getInfo();
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      const personData = rows.find(x => x.email === "anton.shakhlovich@siliconmint.com");
      setVac(personData)
    }

    getData();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <table>
          <tbody>
            <tr>
              <td>{vac["name"]}</td>
              <td>{vac.email}</td>
              <td>{vac.vacBalance}</td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
