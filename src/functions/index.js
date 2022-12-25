const { google } = require('googleapis');
const { promisify } = require('util');
const functions = require('@google-cloud/functions-framework');

functions.http('userData', (req, res) => {
    google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }).then(auth => {
        const api = google.sheets({ version: 'v4', auth });
        const getValues = promisify(api.spreadsheets.values.batchGet.bind(api.spreadsheets.values));
        return getValues({ spreadsheetId: process.env.GOOGLE_SHEET_ID, ranges: ['BalanceConfidential!A2:I99', 'RequestsData!A:H'] });
    }).then( ({ data }) => {
        res.status(200).send(data);
    }).catch(err =>
        res.status(500).send(err)
    );
});

const getUserEmailbyToken = (token) => {
    
}
