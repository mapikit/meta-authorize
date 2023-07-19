import { randomUUID } from "crypto";
import { createToken, hash, matchesHash, verifyToken } from "../src/index.js";
import { expect } from "chai";

describe("Complete Test Suite", () => {
  const signingKey = randomUUID();
  

  it("JSON token signing", () => {
    const data = {
      name: "testName"
    }

    const result = createToken({ data, signingKey })

    expect(result).to.not.be.empty;
  });

  it("JSON token verifying - Correct Signing Key", () => {
    const data = {
      name: "testName",
      rand: randomUUID(),
    }

    const token = createToken({ data, signingKey });
    const result = verifyToken({ token : token.token , signingKey });

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

    const token = createToken({ data, signingKey });
    const result = verifyToken({ token : token.token , signingKey: wrongToken });

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
