import { exportPKCS8, exportSPKI, generateKeyPair, importPKCS8, importSPKI, KeyLike } from "jose";

const DEFAULT_KEY_PATH = "./.keys";
const DEFAULT_KEY_NAME = "jwt_rsa";

export class MetaAuthRuntimeEnvironment {
  public privateKey : KeyLike = null;
  public publicKey : KeyLike = null;

  public constructor () {}

  // eslint-disable-next-line max-lines-per-function
  public async boot () : Promise<void> {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const keysPath = path.resolve(path.join(process.cwd(), DEFAULT_KEY_PATH));
    const keysFilePath = path.resolve(path.join(keysPath, DEFAULT_KEY_NAME));
    let hasToCreateFolder = false;
    let keysExist = true;

    await fs.access(keysPath, fs.constants.R_OK)
      .catch(() => { hasToCreateFolder = true; });

    if (hasToCreateFolder) {
      await fs.mkdir(keysPath);
    }

    await fs.access(keysFilePath, fs.constants.R_OK)
      .catch(() => { keysExist = false; });

    if (!keysExist) {
      const keys = await this.generateRsaKeys();
      await fs.writeFile(keysFilePath, keys.private);
      await fs.writeFile(keysFilePath+".pub", keys.public);
      this.publicKey = await importSPKI(keys.public, "RS256");
      this.privateKey = await importPKCS8(keys.private, "RS256");

      return;
    }

    const privateKey = await fs.readFile(keysFilePath);
    this.privateKey = await importPKCS8(privateKey.toString(), "RS265");
    const publicKey = await fs.readFile(keysFilePath+".pub");
    this.publicKey = await importSPKI(publicKey.toString(), "RS256");
  }

  private async generateRsaKeys () : Promise<{ private : string, public : string }> {
    const keys = await generateKeyPair("RS256");
    const publicKeyPEM = await exportSPKI(keys.publicKey);
    const privateKeyPEM = await exportPKCS8(keys.privateKey);

    return { private: privateKeyPEM, public: publicKeyPEM };
  }
}
