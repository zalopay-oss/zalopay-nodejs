import { ZaloPayClient } from "../zaloPayClient";
import * as CryptoJS from "crypto-js";
import { Config } from "../index";

export class SecurityProvider {
  config: Config;
  constructor(client: ZaloPayClient) {
    this.config = client.config;
  }

  getVerifyMacString(data: string) {
    return CryptoJS.HmacSHA256(data, this.config.key2).toString();
  }
}