import sql from "./db.js";
import lang from "./lang/en.js";

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