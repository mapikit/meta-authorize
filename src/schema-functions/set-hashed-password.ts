import { hash } from "argon2";
import { AuthorizationEntity, FunctionDefinition, SchemaEntity } from "../types.js";

export const setPasswordFunctionDefinition : FunctionDefinition = {
  input: { entity: { type: "cloudedObject", required: true }, newPassword: { type: "string", required: true } },
  output: { entity: { type: "cloudedObject" } },
  functionName: "setPassword",
};

type NewPasswordFunctionInput = { entity : SchemaEntity, newPassword : string };
export const generateSetHashedPasswordSchemaFunction = (authEntity : AuthorizationEntity)
  : (input : NewPasswordFunctionInput) => Promise<{ entity : SchemaEntity }> => {
  return async (input : { entity : SchemaEntity, newPassword : string }) => {
    input.entity[authEntity.passwordProperty] = await hash(input.newPassword);
    return { entity: input.entity };
  };
};
