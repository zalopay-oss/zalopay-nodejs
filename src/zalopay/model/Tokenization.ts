import {BaseResponse} from "./BaseResponse";

export interface CreateBindingRequest {
    appId?: number;
    bindingData: string;
    appTransId: string;
    bindingType: string;
    identifier: string;
    maxAmount: number;
    redirectUrl?: string;
    redirectDeepLink?: string;
    callbackUrl?: string;
    reqDate: number;
    mac?: string;
}

export interface CreateBindingResponse extends BaseResponse {
    bindingToken: string;
    deepLink: string;
    bindingQRLink: string;
    shortLink: string;
}

export interface QueryBindingRequest {
    appId?: number;
    appTransId: string;
    reqDate: number;
    mac?: string;
}

export interface QueryBindingResponse extends BaseResponse {
    data: QueryBindingResponseData
}

interface QueryBindingResponseData {
    appId: number;
    appTransId: string;
    bindingId: string;
    payToken: string;
    serverTime: number;
    merchantUserId: string;
    status: number;
    msgType: number;
    zpUserId: number;
    maskedUserPhone: string;
}

export interface QueryUserBalanceRequest {
    appId?: number;
    identifier: string;
    payToken: string;
    reqDate: number;
    amount: number;
    mac?: string;
}

export interface QueryUserBalanceResponse extends BaseResponse {
    data: Array<UserBalanceDetail>;
    discountAmount: number
}

interface UserBalanceDetail {
    channel: number;
    payable: boolean;
    bankCode: string;
}

export interface DeleteBindingRequest {
    appId?: number;
    identifier: string;
    bindingId: string;
    reqDate: number;
    mac?: string;
}

export interface DeleteBindingResponse extends BaseResponse {
}