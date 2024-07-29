import { jwtVerify, KeyLike } from "jose";

type VerifyTokenFunctionInput = { token : string };

type VerifyTokenFunctionOutput = { valid : boolean, data : object };

export const getVerifyTokenFunction = (signingKey : KeyLike) => async ({ token } : VerifyTokenFunctionInput)
: Promise<VerifyTokenFunctionOutput> => {
  let tokenData = {};
  let valid = true;

  try {
    const result = await jwtVerify(token, signingKey);
    tokenData = result.payload;

  } catch {
    valid = false;
    tokenData = {};
  }

  return {
    valid, data : tokenData,
  };
};
