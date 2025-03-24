import sql from "./db.js";
import lang from "./lang/en.js";
import { getAccuracy, getWPM, getAWPM } from "./utils/store_test.js";

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

export async function storeTest(req, res) {
  try {
    const { keyStrokes, prompt, duration } = req.body;

    if (!keyStrokes || !prompt || !duration) {
      return res.status(400).json({ message: "Missing required fields "});
    }

    const accuracy = getAccuracy(keyStrokes, prompt);
    const wpm = getWPM(keyStrokes, duration);
    const awpm = getAWPM(keyStrokes, duration, prompt);

    res.json({ message: "Test processed!", accuracy, wpm, awpm });
  } catch (error) {
    console.error("Error processing test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}