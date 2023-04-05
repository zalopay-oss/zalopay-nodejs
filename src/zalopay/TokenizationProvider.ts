import { AxiosInstance } from "axios";
import { Config } from "../ZaloPay";
import { toSnake } from "./mapper/mapper";
import { CreateTokenizationRequest, CreateTokenizationResponse } from "./model/Tokenization";
import { ZaloPayClient } from "./ZaloPayClient";

export class TokenizationProvider {
  config: Config;
  httpClient: AxiosInstance;
  constructor(client: ZaloPayClient) {
    this.config = client.config;
    this.httpClient = client.httpClient
  }

  create(input: CreateTokenizationRequest): Promise<CreateTokenizationResponse> {
    const request = toSnake(input)

    return new Promise<CreateTokenizationResponse>((resolve, _) => {
      const res: CreateTokenizationResponse = {
        returnCode: 1,
        returnMessage: "test",
        subReturnCode: 1,
        subReturnMessage: "test",
        data: {
          appId: 1,
          appTransId: "test",
          bindingData: "test",
          payToken: "test",
          serverTime: 0,
          merchantUserId: "test",
          status: 0,
          msgType: 0,
          zpUserId: "",
          maskedUserPhone: "test"
        },
      }
      resolve(res);
    })

  }

  private getCreateOrderMac(order: CreateTokenizationRequest) {
    const data = order.appId + "|" + order.appTransId + "|" + order.bindingData + "|" + order.bindingType + "|" + order.identifier + "|" + order.maxAmount + "|" + order.reqDate;
    return CryptoJS.HmacSHA256(data, this.config.key1).toString();
  }
}