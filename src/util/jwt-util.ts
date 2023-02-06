import jwt, { SignOptions } from "jsonwebtoken";
const secretkey = "secretkey";

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  return jwt.sign(payload, secretkey, { expiresIn: "3h" });
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, secretkey);
  } catch (err) {
    return null;
  }
};

export const signRefresh = (payload: Object, options: SignOptions = {}) => {
  return jwt.sign({ payload }, secretkey, { expiresIn: "12h" });
};

export const verifyRefresh = (refresh_token: string) => {
  try {
    const [tokenType, tokenValue] = refresh_token.split(" ");
    const result = jwt.verify(tokenValue, secretkey);
    return result;
  } catch (err) {
    return null;
  }
};
