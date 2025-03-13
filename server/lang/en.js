const languageKeys = {
  "ServerError": "Internal server error occurred.",
  "Welcome": "Welcome to the official API of ClickClack!",
  "SignupUserAlreadyExists": "User already exists.",
  "SignupSuccess": "Successfully signed up user.",
  "BadRequest": "Bad request.",
  "InternalServerError": "Internal server error has occurred."
}

export default function lang(key, ...args) {
  if (!(key in languageKeys)) {
    return "";
  }

  let message = languageKeys[key];

  args.forEach(arg => {
    message = message.replace("%%", arg);
  });

  return message;
}