import { BaseResponse } from "./BaseResponse";
export interface CreateOrderRequest {
    appId?: number;
    appTransId: string;
    mac?: string;
    appUser: string;
    appTime?: number;
    amount: number;
    item: string;
    description: string;
    embedData: string;
    bankCode: string;
    callbackUrl?: string;
    deviceInfo?: string;
    subAppId?: string;
    title?: string;
    currency?: string;
    phone?: string;
    email?: string;
    address?: string;
    type: 'order';
}
export declare function isCreateOrderRequest(obj: any): obj is CreateOrderRequest;
export interface CreateOrderResponse extends BaseResponse {
    orderUrl: string;
    zpTransToken: string;
}
export interface CreateQuickPayOrderRequest {
    appId?: number;
    appUser: string;
    appTransId: string;
    appTime?: number;
    amount: number;
    title?: string;
    description: string;
    callbackUrl?: string;
    deviceInfo?: string;
    redirectUrl?: string;
    item: string;
    embedData: string;
    mac?: string;
    paymentCode: string;
    currency?: string;
    userIP?: string;
    type: 'quick_pay';
}
export declare function isCreateQuickPayOrderRequest(obj: any): obj is CreateQuickPayOrderRequest;
export interface CreateQuickPayOrderResponse extends BaseResponse {
    isProcessing: string;
    zpTransId: string;
}
export interface CreateRefundOrderRequest {
    mRefundId: string;
    appId: number;
    zpTransId: string;
    amount: number;
    timestamp: number;
    mac: string;
    description: string;
    type: 'refund';
}
export declare function isCreateRefundOrderRequest(obj: any): obj is CreateRefundOrderRequest;
export interface CreateRefundOrderResponse extends BaseResponse {
    refundId: string;
}
export interface CreateZODOrderRequest {
    appId: number;
    mcRefId: string;
    hubId?: string;
    driverId: string;
    amount: number;
    mac: string;
    receiver: any;
    orderInfo: ZODOrderInfo[];
    mcExtInfo: any;
    type: 'zod';
}
export declare function isCreateZODOrderRequest(obj: any): obj is CreateZODOrderRequest;
export interface ZODOrderInfo {
    trackingNumber: string;
    description: string;
    amount: number;
}
export interface CreateZODOrderResponse {
    orderUrl: string;
}
export interface QueryOrderRequest {
    appId?: number;
    appTransId: string;
    mac?: string;
}
export interface QueryOrderResponse extends BaseResponse {
    isProcessing: boolean;
    zpTransId: number;
    amount: number;
}
