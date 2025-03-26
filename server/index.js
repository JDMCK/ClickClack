import express from 'express'
import * as auth from './authentication.js'
import bodyParser from 'body-parser'
import * as ai from './ai.js';
import * as test from './test.js';
import * as users from './users.js';
import lang from './lang/en.js';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3001;
const API_PREFIX = "/api/v1";

// -------------------- Middleware --------------------
app.use(bodyParser.json()) // for parsing application/json
app.use(cookieParser()); // enables reading cookies from `req.cookies`
app.use((req, res, next) => { // CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow all origins (*), change for production
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, Authorization header)

  // Automatically respond to OPTIONS (preflight) requests
  if (req.method === "OPTIONS") {
      return res.sendStatus(204); // No Content
  }

  next();
});


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

// -------------------- User endpoints --------------------
app.get(`${API_PREFIX}/users/get-previous-prompts/`, auth.middleware, async (req, res) => {
  try {
    await test.getPreviousPrompts(req, res);
  } catch (error) {
    serverError(res, error);
  }
});

app.post(`${API_PREFIX}/test/save-test/`, auth.middleware, async (req, res) => {
  try {
    await test.saveTest(req, res);
  } catch (error) {
    serverError(res, error);
  }
})

app.get(`${API_PREFIX}/users/profile/`, auth.middleware, async (req, res) => {
  try {
    await users.profile(req, res);
  } catch (error) {
    serverError(res, error);
  }
})

// -------------------- AI endpoints --------------------
app.post(`${API_PREFIX}/ai/generate-test-prompt/`, auth.middleware, async (req, res) => {
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