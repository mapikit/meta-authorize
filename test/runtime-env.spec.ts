import { MetaAuthRuntimeEnvironment } from "../src/runtime-environment.js";
import { describe, expect, it } from "vitest";

describe("Runtime Environment Tests", () => {
  it("Boots successfully - Loads existing or creates keys", async () => {
    const env = new MetaAuthRuntimeEnvironment();
    await env.boot();

    expect(env.privateKey).to.not.be.null;
    expect(env.publicKey).to.not.be.null;
  });
});
