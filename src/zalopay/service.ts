import {Config} from "./model/Config";
import {AxiosInstance} from "axios";
import {ZaloPayClient} from "./ZaloPayClient";

class Service {
    config: Config;
    httpClient: AxiosInstance

    protected constructor(client: ZaloPayClient) {
        this.config = client.config;
        this.httpClient = client.httpClient;
    }
}

export default Service;