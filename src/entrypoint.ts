import { AddonConfiguration } from "types.js";
import { createTokenFunction, hashFunction, matchesHashFunction, verifyTokenFunction } from "./definitions.js";
import { setAuthorizationSchema } from "schema-functions/modify-authorization-schema.js";
import { MetaAuthRuntimeEnvironment } from "runtime-environment.js";
import { getCreateTokenFunction } from "standard-functions/create-token.js";
import { getVerifyTokenFunction } from "standard-functions/verify-token.js";

// eslint-disable-next-line max-lines-per-function, @typescript-eslint/explicit-module-boundary-types
export const configure = (broker, configuration : AddonConfiguration) : void => {
  configuration.authorizationEntities.forEach((authEntity) => {
    const schema = broker.schemas.getSchema(authEntity.schemaIdentifier);
    const modifiedSchema = setAuthorizationSchema(schema, authEntity);
    broker.schemas.modifySchema(modifiedSchema);

  });

  const standardFunctions = [hashFunction, matchesHashFunction];
  const standardPreregisterFunctions = [createTokenFunction, verifyTokenFunction];

  for (const func of standardFunctions) {
    broker.addonsFunctions.register(func.function, func.definition);
  }

  for (const func of standardPreregisterFunctions) {
    broker.addonsFunctions.preregistter(func.definition);
  }

  broker.done();
};

export const boot = async (broker) : Promise<void> => {
  const environment = new MetaAuthRuntimeEnvironment();
  await environment.boot();

  broker.addonsFunctions.setPreregistered(createTokenFunction.definition.functionName,
    getCreateTokenFunction(environment.privateKey),
  );
  broker.addonsFunctions.setPreregistered(verifyTokenFunction.definition.functionName,
    getVerifyTokenFunction(environment.publicKey),
  );
};
