// Electron
import { app, BrowserWindow } from 'electron';

import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

import routes from './server/app/routes';
import CONNECTION_URL from './server/config/db';

const basepath = app.getAppPath();
let win;

const startServer = () => {
  const app = express();
  const port = 8000;

  const dbName = 'youareprogrammer';

  app.use(bodyParser.json());

  MongoClient.connect(CONNECTION_URL, {
    useNewUrlParser: true
  }, (err, client) => {
    if (err) return console.log(err);

    const db = client.db(dbName);

    routes(app, db);

    app.listen(port, () => {
      console.log(`Server started on ${port}`);
      win.loadURL(`file://${basepath}/dist/youareprogrammer-frontend/index.html`);
    });

    return true;
  });
}

const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })

  startServer();

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})