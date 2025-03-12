import sql from "./db.js";
import Joi from 'joi'
import bcrypt from 'bcrypt';

export async function signup(req, res) {

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

  schema.validate(req.body);

  // salt and hash
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
  const hash = await bcrypt.hash(password, salt); // Hash password with salt


  // const response = await sql`
  //   INSERT INTO users (username, email)
  //   VALUES('jdmck', 'jesse@jessemckenzie.com');
  // `;
  return { status: 'ok', response: "good stuff!" };
}

export async function login(req, res) {
  
}

export function middleware(req, res, next) {


  next();
}