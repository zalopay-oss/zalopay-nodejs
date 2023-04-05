import { CreateOrderRequest, CreateOrderResponse, CreateQuickPayOrderRequest, CreateQuickPayOrderResponse, CreateRefundOrderRequest, CreateRefundOrderResponse, CreateZODOrderRequest, CreateZODOrderResponse, QueryOrderRequest, QueryOrderResponse } from "./model/Order";
import { ZaloPayClient } from "./ZaloPayClient";
import { AxiosInstance } from "axios";
import { Config } from "./model/Config";
export declare class OrderProvider {
    config: Config;
    httpClient: AxiosInstance;
    constructor(client: ZaloPayClient);
    create(order: CreateOrderRequest): Promise<CreateOrderResponse>;
    create(order: CreateQuickPayOrderRequest): Promise<CreateQuickPayOrderResponse>;
    create(order: CreateRefundOrderRequest): Promise<CreateRefundOrderResponse>;
    create(order: CreateZODOrderRequest): Promise<CreateZODOrderResponse>;
    query(order: QueryOrderRequest): Promise<QueryOrderResponse>;
    private getCreateOrderMac;
    private getQueryOrderMac;
}
