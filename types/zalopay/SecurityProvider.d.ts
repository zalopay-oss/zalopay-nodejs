import { ZaloPayClient } from "./ZaloPayClient";
import { Config } from "../ZaloPay";
export declare class SecurityProvider {
    config: Config;
    constructor(client: ZaloPayClient);
    getMac(data: string): string;
}
