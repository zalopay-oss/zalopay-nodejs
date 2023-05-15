import HmacUtils from "../../utils/hmacUtils";
import * as CryptoJS from "crypto-js";

describe("HmacUtils", () => {
  it("should calculate HMAC correctly", () => {
    const data = "example data";
    const key = "example key";
    const expectedHmac = CryptoJS.HmacSHA256(data, key).toString();

    const hmacUtils = new HmacUtils();
    const calculatedHmac = hmacUtils.calculateHmac(data, key);

    expect(calculatedHmac).toEqual(expectedHmac);
  });
});