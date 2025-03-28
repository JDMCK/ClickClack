import sql from "./db.js";
import lang from "./lang/en.js";
import { getAccuracy, getWPM, getAWPM } from "./utils/save_test.js";

export async function getPreviousPrompts(req, res) {
  const response = {
    result: 0,
    data: {},
    message: '',
    error: '',
    received: req.body
  };

  try {
    const result = await sql`
      SELECT promptid, text, difficulty, theme FROM prompts
      WHERE userid = ${req.userid};    
    `;
    response.data = result;
  } catch (error) {
    response.result = 1;
    response.message = lang("PromptsRetrievalFailure");
    res.status(500).json(response);
    return;
  }
  res.json(response);
}

export async function saveTest(req, res) {
  const response = {
    result: 0,
    data: {},
    message: '',
    error: '',
    received: req.body
  };

  try {
    const { keyStrokes, prompt, duration, promptid } = req.body;

    if (!keyStrokes || !prompt || !duration) {
      response.result = 1;
      response.message = "Missing required fields."
      return res.status(400).json(response);
    }

    const accuracy = getAccuracy(keyStrokes, prompt);
    const wpm = getWPM(keyStrokes, duration);
    const awpm = getAWPM(keyStrokes, prompt, duration);
    const date = new Date().toISOString(); 
    const userid = req.userid;

    await sql`
      INSERT INTO tests (promptid, userid, wpm, awpm, accuracy, date)
      VALUES (${promptid}, ${userid}, ${wpm}, ${awpm}, ${accuracy}, ${date});
    `;

    response.data.accuracy = accuracy;
    response.data.wpm = wpm;
    response.data.awpm = awpm;

    res.json(response);
  } catch (error) {
    console.error("Error processing test:", error);
    response.message = "Internal server error."
    res.status(500).json(response);
  }
}

export async function getTests(req, res) {
  const response = {
    result: 0,
    data: {},
    message: '',
    error: '',
    received: ''
  };

  try {
    const userid = req.userid;

    const tests = await sql`
      SELECT testid, promptid, wpm, awpm, accuracy, date
      FROM tests
      WHERE userid = ${userid}
      ORDER BY date DESC;
    `;

    response.data.tests = tests;
    response.message = "Tests retrieved successfully.";
    res.json(response);
  } catch (error) {
    console.error("Error retrieving tests:", error);
    response.result = 1;
    response.message = "Failed to retrieve tests.";
    response.error = error;
    res.status(500).json(response);
  }
}
