import { CreateOrderRequest, CreateOrderResponse, CreateQuickPayOrderRequest, CreateQuickPayOrderResponse, CreateRefundOrderRequest, CreateRefundOrderResponse, CreateZODOrderRequest, CreateZODOrderResponse, isCreateOrderRequest, isCreateRefundOrderRequest, isCreateZODOrderRequest, QueryOrderRequest, QueryOrderResponse } from "./model/Order";
import { ZaloPayClient } from "./zaloPayClient";
import * as CryptoJS from "crypto-js"
import * as qs from "qs"
import { AxiosInstance } from "axios";
import { Config } from "./model/Config";
import { toQueryOrderRequestJSON, toQueryOrderResponse } from "./mapper/Order";
import { CreateOrderResponseJSON, QueryOrderResponseJSON } from "./model/json/Order";
import { toCamel, toSnake } from "./mapper/mapper";

export class OrderProvider {
  config: Config;
  httpClient: AxiosInstance;
  constructor(client: ZaloPayClient) {
    this.config = client.config;
    this.httpClient = client.httpClient
  }
  create(order: CreateOrderRequest): Promise<CreateOrderResponse>
  create(order: CreateQuickPayOrderRequest): Promise<CreateQuickPayOrderResponse>
  create(order: CreateRefundOrderRequest): Promise<CreateRefundOrderResponse>
  create(order: CreateZODOrderRequest): Promise<CreateZODOrderResponse>
  create(order: CreateOrderRequest | CreateQuickPayOrderRequest | CreateRefundOrderRequest | CreateZODOrderRequest)
    : Promise<CreateOrderResponse | CreateQuickPayOrderResponse | CreateRefundOrderResponse | CreateZODOrderResponse> {
    if (isCreateOrderRequest(order)) {
      order.appId = order.appId || +this.config.appId
      order.callbackUrl = order.callbackUrl || this.config.callbackUrl
      order.appTime = order.appTime || Date.now()

      // This to ensure that the mac is created correctly with the latest data
      order.mac = this.getCreateOrderMac(order)
      const request = toSnake(order)
      return this.httpClient
        .post<CreateOrderResponseJSON>("/v2/create", null, { params: request })
        .then((data) => <CreateOrderResponse>toCamel(data.data));
    } else if (isCreateRefundOrderRequest(order)) {
      return new Promise<CreateRefundOrderResponse>((resolve, _) => {
        const res: CreateRefundOrderResponse = <CreateRefundOrderResponse>{}
        resolve(res);
      })
    } else if (isCreateZODOrderRequest(order)) {
      return new Promise<CreateZODOrderResponse>((resolve, _) => {
        const res: CreateZODOrderResponse = <CreateZODOrderResponse>{}
        resolve(res);
      })

    }
    // add more logic for other types here
    else {
      return new Promise<CreateQuickPayOrderResponse>((resolve, _) => {
        const res: CreateQuickPayOrderResponse = {
          returnCode: 1,
          returnMessage: "test",
          subReturnCode: 1,
          subReturnMessage: "test",
          isProcessing: "123",
          zpTransId: "123"
        }
        resolve(res);
      })
    }
  }

  query(order: QueryOrderRequest): Promise<QueryOrderResponse> {
    order.appId ||= +this.config.appId
    order.mac = this.getQueryOrderMac(order)

    const request = toQueryOrderRequestJSON(order)
    return this.httpClient
      .post<QueryOrderResponseJSON>("/v2/query",
        qs.stringify(request),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      .then(data => toQueryOrderResponse(data.data))
  }

  private getCreateOrderMac(order: CreateOrderRequest) {
    const data = order.appId + "|" + order.appTransId + "|" + order.appUser + "|" + order.amount + "|" + order.appTime + "|" + order.embedData + "|" + order.item;
    return CryptoJS.HmacSHA256(data, this.config.key1).toString();
  }

  private getQueryOrderMac(order: QueryOrderRequest) {
    const data = order.appId + "|" + order.appTransId + "|" + this.config.key1; // appid|app_trans_id|key1
    return CryptoJS.HmacSHA256(data, this.config.key1).toString();
  }
}
