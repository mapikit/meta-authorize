import { createTokenFunction, hashFunction, matchesHashFunction, verifyTokenFunction } from "./definitions.js"

export const configure = (broker, _configration : unknown) => {
  const functions = [createTokenFunction, verifyTokenFunction, hashFunction, matchesHashFunction];

  for (const func of functions) {
    broker.addonsFunctions.register(func.function, func.definition)
  }

  broker.done();
}

export const boot = () => {}
