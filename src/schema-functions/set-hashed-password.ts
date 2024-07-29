import { hash } from "argon2";
import { AuthorizationEntity, SchemaEntity } from "types";

type NewPasswordFunctionInput = { entity : SchemaEntity, newPassword : string };
export const generateSetHashedPasswordSchemaFunction = (authEntity : AuthorizationEntity)
  : (input : NewPasswordFunctionInput) => Promise<{ entity : SchemaEntity }> => {
  return async (input : { entity : SchemaEntity, newPassword : string }) => {
    input.entity[authEntity.passwordProperty] = await hash(input.newPassword);
    return { entity: input.entity };
  };
};
