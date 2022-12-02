import md5 from 'md5';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default class DocHelper {
    constructor() {
        const {
            REACT_APP_GOOGLE_SHEET_ID
        } = process.env;
        this.doc = new GoogleSpreadsheet(REACT_APP_GOOGLE_SHEET_ID);
    }

    async init() {
        const {
            REACT_APP_GOOGLE_PRIVATE_KEY,
            REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL
        } = process.env;
        await this.doc.useServiceAccountAuth({
            client_email: REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
        })
        await this.doc.getInfo();
        const docEmails = await this.getRowsBySheetName("Users");
        this.users = [];
        docEmails.forEach(row => {
            const md5hash = md5(row.email+process.env.REACT_APP_SALT);
            this.users.push({firstName: row.firstName, lastName: row.lastName, email: row.email, md5: md5hash});
        });
    }

    async getRowsBySheetName(sheetName) {
        const sheet = this.doc.sheetsByTitle[sheetName];
        return (await sheet.getRows());
    }

    getUserByMd5(md5input) {
        return this.users.find(x => x.md5 === md5input);
    }
}