const { google } = require('googleapis');
const { promisify } = require('util');
const functions = require('@google-cloud/functions-framework');

// env variables
const environment = process.env.ENV || 'development';
if (environment === 'development') {
  require('dotenv').config();
}

// Main Function
functions.http('userData', (req, res) => {
  // CORS enable
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  getClient()
    .then((client) => getUserEmailbyToken(client, req.body.id_token || req.query.id_token))
    .then(async (data) => {
      const api = google.sheets({ version: 'v4', auth: data.client });
      const getValues = promisify(api.spreadsheets.values.batchGet.bind(api.spreadsheets.values));
      const values = await getValues({ spreadsheetId: process.env.GOOGLE_SHEET_ID, ranges });
      values.data.valueRanges.forEach((range) => {
        range.values = range.values.filter((x) => x.some((x) => x === data.email));
      });
      return values.data.valueRanges;
    })
    .then((values) => res.status(200).send(mapValues(values)))
    .catch((err) => res.status(500).send(err.message ?? 'something went wrong'));
});

const mapValues = (values) =>
  values.map((tab, index) => {
    return {
      name: tabs[index].name,
      values: tab.values.map((x) =>
        x.reduce((acc, value, i) => {
          return { ...acc, [tabs[index].fields[i]]: value };
        }, {}),
      ),
    };
  });

// Helper Functions
const getUserEmailbyToken = async (client, token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client.id,
  });
  const payload = ticket.getPayload();
  const email = payload.email;
  console.log(`${payload.name} requested vacation balance. [${email}]`);
  return { client, email };
};

const getClient = async () => {
  const params = {
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  };

  if (environment == 'development') {
    const client = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      params.scopes,
    );
    return new Promise((resolve) => {
      resolve(client);
    });
  }
  return google.auth.getClient(params);
};

//Spreadsheet settings
const tabs = [
  {
    name: 'balance',
    sheetName: 'BalanceConfidential',
    rangeStart: 'A',
    rangeEnd: 'I',
    fields: [
      'name',
      'project',
      'email',
      'startDate',
      'vacationBalance',
      'vacationUsedTotal',
      'sickDaysUsedTotal',
      'vacationUsedLastYear',
      'sickDaysUsedLastYear',
    ],
  },
  {
    name: 'requests',
    sheetName: 'RequestsData',
    rangeStart: 'A',
    rangeEnd: 'H',
    fields: ['timestamp', 'email', 'type', 'project', 'startDate', 'endDate', 'length', 'comment'],
  },
];

const ranges = tabs.map((x) => `${x.sheetName}!${x.rangeStart}:${x.rangeEnd}`);
