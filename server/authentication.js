import sql from './db.js';
import Joi from 'joi'
import bcrypt from 'bcrypt';
import lang from './lang/en.js';
import { response } from "express";


const SALTROUNDS = 10;
let isAuthenticated = false;

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
  const { password } = req.body;
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
  // validate input
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 'bad', response: error.details[0].message });
  }
  const { email, password } = req.body;
 
  // get stored password from DB using Supabase client code
  /*
  let { userData: users, error } = await supabase
    .from('users')
    .select('userid, display_name, password_hash')
    .eq('email', email)
    */
  const userData = await sql `
    SELECT userid, display_name, password_hash
    FROM users
    WHERE email LIKE ${email}`;
  const user = userData[0]
  
  const hash = await bcrypt.compare(password, user.password_hash);
  
  // Super basic until figure out more about
  if (userData.password_hash === hash){
    isAuthenticated = true;
    return {status: 'ok', response: 'user logged in!'}
  }
  else{
    return {status: 'bad', response: 'Failed to log in user: hash unmatch'}
  }
}


export function middleware(req, res, next) {


  next();
}