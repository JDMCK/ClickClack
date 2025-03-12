import express from 'express'
import * as auth from './authentication.js'
import lang from './lang/en.js'
import bodyParser from 'body-parser'


const app = express();
const port = 3000;
const API_PREFIX = "/api/v1";

// -------------------- Middleware --------------------
app.use(bodyParser.json()) // for parsing application/json


// -------------------- Begin endpoints --------------------
app.get('/', (_, res) => {
  res.send('This is the root of ClickClack\'s API server.')
})

// -------------------- Auth endpoints --------------------
app.post(`${API_PREFIX}/auth/signup`, async (req, res) => {
  const result = await auth.signup(req, res);
  if (result.status) {
    res.json(result);
  } else {
    res.status(500).json({ result: 0, error: lang('ServerError') });
  }
});

app.post(`${API_PREFIX}/auth/login`, async (req, res) => {
  const result = await auth.login(req, res);
  if (result.status) {
    res.json(result);
  } else {
    res.status(500).json({ result: 0, error: lang('ServerError') });
  }
});


app.listen(port, () => {
  console.log(`ClickClack API listening on port ${port}...`)
})