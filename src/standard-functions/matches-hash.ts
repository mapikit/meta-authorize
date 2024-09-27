import * as argon2 from "argon2";

type MatchesHashFunctionInput = { plain : string; hash : string };
type MatchesHashFunctionOutput = { matches : boolean };

export const matchesHash = async ({ plain, hash } : MatchesHashFunctionInput) : Promise<MatchesHashFunctionOutput> => {
  const result = {
    matches: await argon2.verify(hash, plain),
  };

  return result;
};
