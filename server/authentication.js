import sql from './db.js';
import Joi from 'joi'
import bcrypt from 'bcrypt';
import lang from './lang/en.js';

export async function signup(req, res) {
  const response = {
    result: 0,
    message: '',
    error: '',
    received: req.body
  };

  // input validation
  const schema = Joi.object({
    display_name: Joi.string()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

    email: Joi.string()
      .email()
      .required()
  });
  const validation = schema.validate(req.body);
  if (validation.error !== undefined) {
    response.result = 1;
    response.error = validation.error.details;
    res.status(400).json(response);
    return
  }

  // check if user already exists
  const [{ exists }] = await sql`
    SELECT EXISTS(SELECT 1 FROM users WHERE email = ${req.body.email});
  `;
  if (exists) {
    response.result = 1;
    response.error = lang("SignupUserAlreadyExists");
    res.status(409).json(response);
    return;
  }

  // salt and hash
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
  const hash = await bcrypt.hash(req.body.password, salt); // Hash password with salt


  await sql`
    INSERT INTO users (display_name, email, password_hash)
    VALUES(${req.body.display_name}, ${req.body.email}, ${hash});
  `;
  response.message = lang("SignupSuccess");
  res.json(response);
  return;
}

export async function login(req, res) {
  
}

export function middleware(req, res, next) {


  next();
}