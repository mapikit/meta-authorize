import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { ObjectDefinition } from "@meta-system/object-definition";

const { sign, verify } = jwt;

export type FunctionDefinition = {
  input : ObjectDefinition;
  output : ObjectDefinition;
  functionName : string;
}

export type MetaSystemFunction = {
  function : Function;
  definition : FunctionDefinition;
}

type TokenOpt = {
  expiresIn ?: number;
  audience ?: string[];
  issuer ?: string;
}

// Create Token
// > Receiving random info
// > Receiving an Auth key
// >> Outputs the Token
export const createToken = ({ data, signingKey, options = {} } : { data : object, signingKey : string, options ?: TokenOpt }) : { token : string } => {
  return {
    token: sign(data, signingKey, options)
  }
}

// Verify token
// > with an Auth Key
// >> Outputs a boolean
export const verifyToken = ({ token, signingKey } : { token : string, signingKey : string }) : { valid : boolean, data : object } => {
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
export const hash = async ({ plain } : { plain : string }) : Promise<{ hashed : string}>  => {
  const result = await argon2.hash(plain)

  return {
    hashed: result
  }
}

// Verify Against Hash
// >> Returns boolean
export const matchesHash = async ({ plain, hash } : { plain : string; hash : string }) : Promise<{ matches : boolean }> => {
  const result = {
    matches: await argon2.verify(hash, plain)
  };

  return result;
}
