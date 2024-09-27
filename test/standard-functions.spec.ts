import { getCreateTokenFunction } from "../src/standard-functions/create-token";
import { matchesHash } from "../src/standard-functions/matches-hash";
import { getVerifyTokenFunction } from "../src/standard-functions/verify-token";
import { hash } from "../src/standard-functions/hash";
import { beforeAll, describe, expect, it } from "vitest";
import { generateKeyPair } from "jose";
import { randomUUID } from "node:crypto";

describe("Standard Functions", async () => {
  const signingKey = await generateKeyPair("RS256", { extractable: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let createToken : Function = (..._params : void[]) : void => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let verifyToken : Function = (..._params : void[]) : void => {};

  beforeAll(() => {
    createToken = getCreateTokenFunction(signingKey.privateKey);
    verifyToken = getVerifyTokenFunction(signingKey.publicKey);
  });


  it("JSON token signing", async () => {
    const data = {
      name: "testName",
    };

    const result = await createToken({ data, signingKey });

    expect(result).to.not.be.empty;
  });

  it("JSON token verifying - Correct Signing Key", async () => {
    const data = {
      name: "testName",
      rand: randomUUID(),
    };

    const token = await createToken({ data, signingKey });
    const result = await verifyToken({ token : token.token , signingKey });

    expect(result.data["name"]).to.be.deep.equal(data.name);
    expect(result.data["rand"]).to.be.deep.equal(data.rand);
    expect(result.valid).to.be.true;
  });

  it("JSON token verifying - wrong token", async () => {
    const wrongToken = await generateKeyPair("RS256", { extractable: true });

    const data = {
      name: "testName",
      rand: randomUUID(),
    };

    const token = await createToken({ data, signingKey });
    const wrongKeyVerifyToken = getVerifyTokenFunction(wrongToken.privateKey);
    const result = await wrongKeyVerifyToken({ token : token.token });

    expect(result.data).to.be.deep.equal({});
    expect(result.valid).to.be.false;
  });

  it("Hash success", async () => {
    const result = await hash({ plain: randomUUID() });

    expect(result.hashed).to.not.be.empty;
  });

  it("Verify Hash", async () => {
    const plain = randomUUID();
    const hashRes = await hash({ plain });

    const result = await matchesHash({ plain, hash: hashRes.hashed });

    expect(result.matches).to.be.true;
  });

  it("Verify Wrong Hash", async () => {
    const plain = randomUUID();
    const hashRes = await hash({ plain });

    const result = await matchesHash({ plain : randomUUID(), hash: hashRes.hashed });

    expect(result.matches).to.be.false;
  });
});
