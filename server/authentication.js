import sql from './db.js';
import Joi from 'joi'
import bcrypt from 'bcrypt';
import lang from './lang/en.js';
import jwt from 'jsonwebtoken';


export async function signup(req, res) {
  const response = {
    result: 0, // bad if 1, gud if 0
    data: {},
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
    response.message = lang("BadRequest");
    response.error = validation.error.details;
    res.status(400).json(response);
    return
  }

  // check if user already exists
  try {
    const [{ exists }] = await sql`
      SELECT EXISTS(SELECT 1 FROM users WHERE email = ${req.body.email});
    `;
    if (exists) {
      response.result = 1;
      response.message = lang("SignupUserAlreadyExists");
      res.status(409).json(response);
      return;
    }
  } catch (error) {
    response.result = 1;
    response.message = lang("InternalServerError");
    response.error = error;
    res.status(500).json(response);
  }

  // salt and hash
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
  const hash = await bcrypt.hash(req.body.password, salt); // Hash password with salt

  try {
    const [{ userid }] = await sql`
      INSERT INTO users (display_name, email, password_hash)
      VALUES(${req.body.display_name}, ${req.body.email}, ${hash})
      RETURNING userid;
    `;
    response.data.userid = userid;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userid }, SECRET_KEY, { expiresIn: "24h" });
    response.message = lang("SignupSuccess");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // only send over HTTPS
      maxAge: 86400000 // 24 hours
    });
  } catch (error) {
    response.result = 1;
    response.message = lang("InternalServerError");
    response.error = error;
    res.status(500).json(response);
  }
  res.json(response);
}

export async function login(req, res) {
  const response = {
    result: 0,
    data: {},
    message: '',
    error: '',
    received: req.body
  };

  // validate input
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error !== undefined) {
    response.result = 1;
    response.error = validation.error.details;
    res.status(400).json(response);
    return;
  }

  const [user] = await sql`
    SELECT userid, display_name, password_hash
    FROM users
    WHERE email = ${req.body.email};
  `;

  if (!user){
    response.result = 1;
    response.error = lang("LoginUserNotFound");
    res.status(404).json(response);
    return;
  }

  const isValidPassword = await bcrypt.compare(req.body.password, user.password_hash);
  if (!isValidPassword){
    response.result = 1;
    response.message = lang("LoginPasswordNotMatched");
    res.status(401).json(response);
    return;
  }

  response.data.userid = user.userid;
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ userid: user.userid }, SECRET_KEY, { expiresIn: "24h" });
  response.message = lang("LoginSuccess");
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // only send over HTTPS
    maxAge: 86400000 // 24 hours
  });
  res.json(response);
}

export async function isAuthenticated(req, res) {
  const response = {
    result: 0,
    data: {
      loggedin: false,
      userid: ''
    },
    message: '',
    error: '',
    received: req.body
  };

  const token = req.cookies.token;

  if (!token) {
    response.result = 1;
    response.message = lang("LoginNoUserToken");
    res.status(401).json(response);
    return;
  }

  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    const userid = jwt.verify(token, SECRET_KEY);
    response.data.loggedin = true;
    response.data.userid = userid;
    response.message = lang("LoginUserLoggedIn");
  } catch (error) {
    response.result = 1;
    response.error = error;
    response.message = lang("LoginUserNotLoggedIn");
    res.status(403).json(response);
    return;
  }

  res.json(response);
}


export function middleware(req, res, next) {


  next();
}