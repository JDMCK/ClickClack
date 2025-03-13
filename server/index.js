import express from 'express'
import * as auth from './authentication.js'
import lang from './lang/en.js'
import bodyParser from 'body-parser'
import * as ai from './ai.js';


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
  await auth.signup(req, res);
});

app.post(`${API_PREFIX}/auth/login`, async (req, res) => {
  await auth.login(req, res);
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
app.post(`${API_PREFIX}/ai/generate-test-prompt`, async (req, res) => {
  await ai.generateTestPrompt(req, res);
});

app.listen(port, () => {
  console.log(`ClickClack API listening on port ${port}...`)
});