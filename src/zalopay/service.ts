import { Config } from "./utils/Config";
import { AxiosInstance } from "axios";
import { ZaloPayClient } from "./zaloPayClient";

class Service {
    config: Config;
    httpClient: AxiosInstance;

    protected constructor(client: ZaloPayClient) {
        this.config = client.config;
        this.httpClient = client.httpClient;
    }
}

export default Service;