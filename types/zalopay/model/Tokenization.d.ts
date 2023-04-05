import { BaseResponse } from "./BaseResponse";
export interface CreateTokenizationRequest {
    appId: number;
    bindingData?: string;
    appTransId: string;
    bindingType?: string;
    identifier: string;
    maxAmount: number;
    redirectUrl?: string;
    redirectDeepLink?: string;
    callbackUrl?: string;
    reqDate: number;
    mac: string;
}
export interface CreateTokenizationResponse extends BaseResponse {
    data: CreateTokenizationDataResponse;
}
interface CreateTokenizationDataResponse {
    appId: number;
    appTransId: string;
    bindingData: string;
    payToken: string;
    serverTime: number;
    merchantUserId: string;
    status: number;
    msgType: number;
    zpUserId: string;
    maskedUserPhone: string;
}
export {};
