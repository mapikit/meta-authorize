import { matchesHash } from "../standard-functions/matches-hash.js";
import { AuthorizationEntity, FunctionDefinition, SchemaEntity } from "../types.js";

export const passwordMatchesDefinition : FunctionDefinition = {
  input: { entity: { type: "cloudedObject", required: true }, password: { type: "string", required: true } },
  output: { value: { type: "boolean" } },
  functionName: "passwordMatches",
};

type PasswordMatchesFunctionInput = { entity : SchemaEntity, password : string };
export const generatePasswordMatchesSchemaFunction = (authEntity : AuthorizationEntity)
  : (input : PasswordMatchesFunctionInput) => Promise<{ value : boolean }> => {
  return async (input : PasswordMatchesFunctionInput) => {
    if (! input.entity[authEntity.passwordProperty]) return { value: false };

    const result = await matchesHash({
      plain: input.password,
      hash: input.entity[authEntity.passwordProperty] as string,
    });
    return ({
      value: result.matches,
    });
  };
};
