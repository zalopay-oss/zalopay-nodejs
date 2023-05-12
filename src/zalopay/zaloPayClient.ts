import axios, { AxiosInstance } from "axios";
import { Config } from "./utils/Config";
import { SecurityProvider } from "./securityProvider";

export class ZaloPayClient {
  config: Config;
  httpClient: AxiosInstance;
  securityProvider: SecurityProvider;

  constructor(config: Config) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: config.env == "sandbox" ? "https://sb-openapi.zalopay.vn" : "https://openapi.zalopay.vn",
    });
    this.securityProvider = new SecurityProvider(this);
  }
}
