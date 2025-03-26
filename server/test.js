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
      SELECT text, difficulty, theme FROM prompts
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
    const { keyStrokes, prompt, duration } = req.body;

    if (!keyStrokes || !prompt || !duration) {
      response.result = 1;
      response.message = "Missing required fields."
      return res.status(400).json(response);
    }

    const accuracy = getAccuracy(keyStrokes, prompt);
    const wpm = getWPM(keyStrokes, duration);
    const awpm = getAWPM(wpm, keyStrokes, duration, prompt);

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