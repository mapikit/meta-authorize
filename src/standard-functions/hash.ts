import * as argon2 from "argon2";

type HashFunctionInput = { plain : string };
type HashFunctionOutput = { hashed : string};

export const hash = async ({ plain } : HashFunctionInput) : Promise<HashFunctionOutput> => {
  const result = await argon2.hash(plain);

  return {
    hashed: result,
  };
};
