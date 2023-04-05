import { CreateOrderRequestJSON, CreateOrderResponseJSON, QueryOrderRequestJSON, QueryOrderResponseJSON } from "../model/json/Order";
import { CreateOrderRequest, CreateOrderResponse, QueryOrderRequest, QueryOrderResponse } from "../model/Order";
export declare function toCreateOrderRequestJSON(input: CreateOrderRequest): CreateOrderRequestJSON;
export declare function toCreateOrderResponse(input: CreateOrderResponseJSON): CreateOrderResponse;
export declare function toQueryOrderRequestJSON(input: QueryOrderRequest): QueryOrderRequestJSON;
export declare function toQueryOrderResponse(input: QueryOrderResponseJSON): QueryOrderResponse;
