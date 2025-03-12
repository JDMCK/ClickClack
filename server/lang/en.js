const languageKeys = {
  "ServerError": "Internal server error occurred.",
  "Welcome": "Welcome to the official API of ClickClack!"
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