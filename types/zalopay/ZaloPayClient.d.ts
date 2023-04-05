import { AxiosInstance } from "axios";
import { Config } from "./model/Config";
import { OrderProvider } from "./OrderProvider";
import { SecurityProvider } from "./SecurityProvider";
export declare class ZaloPayClient {
    config: Config;
    httpClient: AxiosInstance;
    orderProvider: OrderProvider;
    securityProvider: SecurityProvider;
    constructor(config: Config);
}
