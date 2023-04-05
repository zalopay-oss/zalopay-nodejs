import { ZaloPayClient } from "./ZaloPayClient";
import * as CryptoJS from "crypto-js"
import { Config } from "../ZaloPay";

export class SecurityProvider {
  config: Config
  constructor(client: ZaloPayClient) {
    this.config = client.config
  }

  getMac(data: string) {
    return CryptoJS.HmacSHA256(data, this.config.key2).toString();
  }
}