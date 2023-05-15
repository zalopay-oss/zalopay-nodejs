import RSAUtils from "../../utils/rsaUtils";
import { Config } from "../../utils/Config";

describe("RSAUtils", () => {
  const key = "MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAuhr9fssauZOaef4HCEJ4OAJQ6g8y\
  O8de5KwB1LM/fIlRZGsnD0VO+YBGrdttnKsieErQPujmyV7Tnw19yLVGGwIDAQABAkEAgpPzbyZU\
  rwbIqXW6O2pf7XR6j29wII9nnmytsC7AicCd2uGAd+yHKEOQGEHBN+rm/IZ8F5WWT2OpnOTY3DZT\
  gQIhAPyzS24ahh0ogYuDy4VXsiLscEAngrAvZA5qpWWPFV9BAiEAvIkWcJzM9kaJ2YjoNcGvO3yd\
  DsepNeC79dfIA7tL6lsCIELaRChayARKxQrd0SfzrWLj3kZ6rW5i+zt9J0iY8/SBAiEAsw53c2hX\
  +KWxkhpGf5d9dz+4YisZ94OCv8+5tGGTjfUCIEs9pi1DsVZBi0HNibXIpVBO4KERvHBJ92bAbPep\
  lIb2";
  const config: Config = {
    appId: "",
    key1: "",
    key2: "",
    privateKey: key,
    env: "sandbox"
  };

  const rsa = RSAUtils.fromConfig(config, { scheme: "pkcs8" });

  it("should sign data with the specified encodings", () => {
    const data = "cd7a32337eedd9763bda3a0654ac9855f36f8d759b7a505e4bfd646a5f5b8056";
    const signature = rsa.sign(data, "base64", "utf8");
    expect(typeof signature).toEqual("string");
    expect(signature.length).toBeGreaterThan(0);
    expect(signature).toEqual("FUsBSTRZAIuz5A8F+KZixT8q3s7iLgLQJLqFzPfazdJnoHv9FJxCRlLaGk10b3SUnsEtLOAkhpQk9QXsepFotw==");
    const verify = rsa.verify(data, signature, "utf8", "base64");
    expect(verify).toEqual(true);
  });

  it("should sign data correctly", () => {
    const data = "test data";
    const signature = rsa.sign(data);
    expect(Buffer.isBuffer(signature)).toEqual(true);
    expect(signature.length).toBeGreaterThan(0);
  });
});