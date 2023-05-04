import axios, { AxiosInstance } from "axios";
import { Config } from "./model/Config";
import { OrderProvider } from "./orderProvider";
import { SecurityProvider } from "./securityProvider";

export class ZaloPayClient {
  config: Config;
  httpClient: AxiosInstance;
  orderProvider: OrderProvider;
  securityProvider: SecurityProvider;

  constructor(config: Config) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: config.env == "sandbox" ? "https://sb-openapi.zalopay.vn" : "https://openapi.zalopay.vn",
    });
    this.orderProvider = new OrderProvider(this);
    this.securityProvider = new SecurityProvider(this);
  }
}
