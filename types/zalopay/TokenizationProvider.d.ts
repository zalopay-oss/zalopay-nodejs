import { AxiosInstance } from "axios";
import { Config } from "../ZaloPay";
import { CreateTokenizationRequest, CreateTokenizationResponse } from "./model/Tokenization";
import { ZaloPayClient } from "./ZaloPayClient";
export declare class TokenizationProvider {
    config: Config;
    httpClient: AxiosInstance;
    constructor(client: ZaloPayClient);
    create(input: CreateTokenizationRequest): Promise<CreateTokenizationResponse>;
    private getCreateOrderMac;
}
