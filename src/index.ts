// This is supposed to be a package containing these functions,
// Which should all be independent from eachother

import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";

type TokenOpt = {
  expiresIn ?: number;
  audience ?: string[];
  issuer ?: string;
}

// Create Token
// > Receiving random info
// > Receiving an Auth key
// >> Outputs the Token
const createToken = ({ data, signingKey, options = {} } : { data : object, signingKey : string, options ?: TokenOpt }) : { token : string } => {
  return {
    token: sign(data, signingKey, options)
  }
}

// Verify token
// > with an Auth Key
// >> Outputs a boolean
const verifyToken = ({ token, signingKey } : { token : string, signingKey : string }) : { valid : boolean, data : object } => {
  let tokenData = {};
  let valid = true;

  try {
    tokenData = verify(token, signingKey);
  } catch {
    valid = false;
    tokenData = {};
  }

  return {
    valid, data : tokenData
  }
}

// Hash Pass
// >> Returns a string
const hash = async ({ plain } : { plain : string }) : Promise<{ hashed : string}>  => {
  const result = await argon2.hash(plain)

  return {
    hashed: result
  }
}

// Verify Against Hash
// >> Returns boolean
const matchesHash = async ({ plain, hash } : { plain : string; hash : string }) : Promise<{ matches : boolean }> => {
  const result = {
    matches: await argon2.verify(hash, plain)
  };

  return result;
}

export default {
  createToken,
  verifyToken,
  hash,
  matchesHash
}
