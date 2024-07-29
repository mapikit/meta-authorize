import { ObjectDefinition } from "@meta-system/object-definition";

export type AddonConfiguration = {
  authorizationEntities : AuthorizationEntity[],
}

export type AuthorizationEntity = {
  schemaIdentifier : string,
  passwordProperty : string,
  loginProperty : string,
}


// Utility Types
export type FunctionDefinition = {
  input : ObjectDefinition;
  output : ObjectDefinition;
  functionName : string;
}

export type MetaSystemFunction = {
  function : Function;
  definition : FunctionDefinition;
}

export type SchemaEntity = Record<string, unknown>;

export type TokenOpt = {
  expiresIn ?: number;
  audience ?: string[];
  issuer ?: string;
};
