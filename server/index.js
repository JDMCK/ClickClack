import express from 'express'
import * as auth from './authentication.js'
import bodyParser from 'body-parser'
import * as ai from './ai.js';
import lang from './lang/en.js';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3001;
const API_PREFIX = "/api/v1";

// -------------------- Middleware --------------------
app.use(bodyParser.json()) // for parsing application/json
app.use(cookieParser()); // enables reading cookies from `req.cookies`


// -------------------- Begin endpoints --------------------
app.get('/', (_, res) => {
  res.send('This is the root of ClickClack\'s API server.')
})

// -------------------- Auth endpoints --------------------
app.post(`${API_PREFIX}/auth/signup/`, async (req, res) => {
  try {
    await auth.signup(req, res);
  } catch (error) {
    serverError(res, error)
  }
});

app.post(`${API_PREFIX}/auth/login/`, async (req, res) => {
  try {
    await auth.login(req, res);
  } catch (error) {
    serverError(res, error)
  }
});

app.get(`${API_PREFIX}/auth/me/`, async (req, res) => {
  try {
    await auth.isAuthenticated(req, res);
  } catch (error) {
    serverError(res, error);
  }
});

// -------------------- Test endpoints --------------------

// -------------------- AI endpoints --------------------
app.post(`${API_PREFIX}/ai/generate-test-prompt/`, async (req, res) => {
  try {
    await ai.generateTestPrompt(req, res);
  } catch (error) {
    serverError(res, error)
  }
});

app.listen(port, () => {
  console.log(`ClickClack API listening on port ${port}...`)
});

function serverError(res, error) {
  res.status(500).json({ message: lang("InternalServerError"), error });
}