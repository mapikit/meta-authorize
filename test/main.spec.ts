import { randomUUID } from "crypto";
import metaAuth from "../src/index";
import { expect } from "chai";

describe("Complete Test Suite", () => {
  const signingKey = randomUUID();
  

  it("JSON token signing", () => {
    const data = {
      name: "testName"
    }

    const result = metaAuth.createToken({ data, signingKey })

    expect(result).to.not.be.empty;
  });

  it("JSON token verifying - Correct Signing Key", () => {
    const data = {
      name: "testName",
      rand: randomUUID(),
    }

    const token = metaAuth.createToken({ data, signingKey });
    const result = metaAuth.verifyToken({ token : token.token , signingKey });

    expect(result.data["name"]).to.be.deep.equal(data.name);
    expect(result.data["rand"]).to.be.deep.equal(data.rand);
    expect(result.valid).to.be.true;
  });

  it("JSON token verifying - wrong token", () => {
    const wrongToken = randomUUID();

    const data = {
      name: "testName",
      rand: randomUUID(),
    }

    const token = metaAuth.createToken({ data, signingKey });
    const result = metaAuth.verifyToken({ token : token.token , signingKey: wrongToken });

    expect(result.data).to.be.deep.equal({});
    expect(result.valid).to.be.false;
  });

  it("Hash success", async () => {
    const result = await metaAuth.hash({ plain: randomUUID() });

    expect(result.hashed).to.not.be.empty;
  });

  it("Verify Hash", async () => {
    const plain = randomUUID();
    const hash = await metaAuth.hash({ plain });

    const result = await metaAuth.matchesHash({ plain, hash: hash.hashed });

    expect(result.matches).to.be.true;
  });

  it("Verify Wrong Hash", async () => {
    const plain = randomUUID();
    const hash = await metaAuth.hash({ plain });

    const result = await metaAuth.matchesHash({ plain : randomUUID(), hash: hash.hashed });

    expect(result.matches).to.be.false;
  });
});
