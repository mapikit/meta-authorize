import { hash } from "./standard-functions/hash.js";
import { matchesHash } from "./standard-functions/matches-hash.js";
import { MetaSystemFunction } from "types.js";

const noop = () : void => {};

export const createTokenFunction : MetaSystemFunction = {
  function: noop,
  definition: {
    functionName: "createToken",
    input: {
      data: { type: "cloudedObject", required: true },
      signingKey: { type: "string", required: true },
      options: { type: "object", required: false, subtype: {
        expiresIn: { type: "number", required: false },
        audience: { type: "array", subtype: "string", required: false },
        issuer: { type: "string", required: false },
      } },
    },
    output: { token: { type: "string", required: true } },
  },
};

export const verifyTokenFunction : MetaSystemFunction = {
  function: noop,
  definition: {
    functionName: "verifyToken",
    output: {
      token: { type: "string", required: true },
      signingKey: { type: "string", required: true },
    },
    input: {
      valid: { type: "boolean", required: true },
      data: { type: "cloudedObject", required: true },
    },
  },
};

export const hashFunction : MetaSystemFunction = {
  function: hash,
  definition: {
    functionName: "hash",
    input: { plain: { type: "string", required: true } },
    output: { hashed: { type: "string", required: true } },
  },
};

export const matchesHashFunction : MetaSystemFunction = {
  function: matchesHash,
  definition: {
    functionName: "matchesHash",
    input: {
      plain: { type: "string", required: true },
      hash: { type: "string", required: true },
    },
    output: { matches: { type: "boolean", required: true } },
  },
};
