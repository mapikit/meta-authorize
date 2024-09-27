import { ObjectDefinition } from "@meta-system/object-definition";
import { SchemaType } from "meta-system/dist/src/configuration/schemas/schemas-type";
import { AuthorizationEntity } from "../types.js";

export const setAuthorizationSchema = (schema : SchemaType, fields : AuthorizationEntity) : SchemaType => {
  const result = schema; // MSYS already clones this, no need to worry about mutations \o/
  setAuthField(result.format, fields.loginProperty);
  setAuthField(result.format, fields.passwordProperty);

  return result;
};

const setAuthField = (format : ObjectDefinition, fieldName : string) : void => {
  format[fieldName] = { type: "string", required: true };
};
