const { google } = require('googleapis');
const { promisify } = require('util');
const functions = require('@google-cloud/functions-framework');

// env variables
const environment = process.env.ENV || 'development';
if (environment === 'development') {
  require('dotenv').config();
}

// Main Function
functions.http('userData', async (req, res) => {
  if (!enableCORS(req, res)) return;

  try {
    const client = await getClient();
    const [ranges, email] = await Promise.all([
      getRanges(client),
      getUserEmailbyToken(client, req.body.id_token || req.query.id_token),
    ]);
    res.status(200).send(getMappedAndFilteredValues(ranges, email));
  } catch (error) {
    res.status(500).send(error.message ?? 'something went wrong');
  }
});

const getRanges = async (client) => {
  const api = google.sheets({ version: 'v4', auth: client });
  const getValues = promisify(api.spreadsheets.values.batchGet.bind(api.spreadsheets.values));
  const values = await getValues({ spreadsheetId: process.env.GOOGLE_SHEET_ID, ranges });
  return values.data.valueRanges;
};

const getMappedAndFilteredValues = (rawRanges, email) => {
  const ranges = mapRanges(rawRanges);
  const personalBalance = ranges
    .find((x) => x.name === 'balance')
    .values.filter((x) => x.email === email)[0];
  const project = personalBalance.project;
  const requests = ranges.find((x) => x.name === 'requests').values;
  const personalRequests = requests.filter((x) => x.email === email);
  const today = new Date();
  const yearFromToday = new Date();
  yearFromToday.setFullYear(today.getFullYear() + 1);
  const teamRequests = requests.filter(
    (x) =>
      x.project === project &&
      x.email !== email &&
      new Date(x.endDate).getTime() >= today.getTime(),
  );
  const holidays = ranges
    .find((x) => x.name === 'holidays')
    .values.filter(
      (x) =>
        new Date(x.date).getTime() >= today.getTime() &&
        new Date(x.date).getTime() <= yearFromToday.getTime(),
    );

  return {
    personalBalance,
    personalRequests,
    teamRequests,
    holidays,
  };
};

const mapRanges = (values) =>
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
  return email;
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

const enableCORS = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return false;
  }
  return true;
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
  {
    name: 'holidays',
    sheetName: 'Holidays',
    rangeStart: 'A',
    rangeEnd: 'C',
    fields: ['date', 'name', 'weekday'],
  },
];

const ranges = tabs.map((x) => `${x.sheetName}!${x.rangeStart}:${x.rangeEnd}`);
