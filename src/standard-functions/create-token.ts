import { SignJWT, KeyLike } from "jose";
import { TokenOpt } from "types";

type CreateTokenFunctionInput = {
  data : object, options ?: TokenOpt
};

type CreateTokenFunctionOutput = {
  token : string;
}

export const getCreateTokenFunction = (signingKey : KeyLike) =>
  async ({ data, options = {} } : CreateTokenFunctionInput)
  : Promise<CreateTokenFunctionOutput> => {
    const jwtSing = new SignJWT({
      aud: options.audience,
      iss: options.issuer,
      exp: options.expiresIn,
      ...data,
    });


    jwtSing.setProtectedHeader({ alg: "RS256" });
    const token = await jwtSing.sign(signingKey);
    return { token };
  };
