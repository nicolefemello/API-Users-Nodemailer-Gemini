import jwt from "jsonwebtoken";

async function createToken(email) {
  try {
    return jwt.sign(email, process.env.KEY_TOKEN);
  } catch (error) {
    return error;
  }
}

export default createToken;
