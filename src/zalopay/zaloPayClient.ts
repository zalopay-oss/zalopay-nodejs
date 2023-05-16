import axios, { AxiosInstance } from "axios";
import { Config } from "./utils/Config";

export class ZaloPayClient {
  config: Config;
  httpClient: AxiosInstance;

  constructor(config: Config) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: config.env == "sandbox" ? "https://sb-openapi.zalopay.vn" : "https://openapi.zalopay.vn",
    });
  }
}
