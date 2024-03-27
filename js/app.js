import { google } from "googleapis";

google.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
});

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = "1ZT9kF6CR3lBukZW-2cB729QW_WlJUDe7QfBKh7Jq47M";
const range = "Sheet1!A1:F30";

sheets.spreadsheets.values
  .get({
    spreadsheetId,
    range,
  })
  .then((response) => {
    const rows = response.data.values;
    if (rows.length) {
      console.log("Data:");
      rows.forEach((row) => {
        console.log(`${row[0]}, ${row[1]}`);
      });
    } else {
      console.log("No data found.");
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });
