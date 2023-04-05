"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryOrderResponse = exports.toQueryOrderRequestJSON = exports.toCreateOrderResponse = exports.toCreateOrderRequestJSON = void 0;
function toCreateOrderRequestJSON(input) {
    const req = {
        app_id: input.appId,
        app_trans_id: input.appTransId,
        mac: input.mac,
        app_user: input.appUser,
        app_time: input.appTime,
        amount: input.amount,
        item: input.item,
        description: input.description,
        embed_data: input.embedData,
        bank_code: input.bankCode,
        callback_url: input.callbackUrl,
        device_info: input.deviceInfo,
        sub_app_id: input.subAppId,
        title: input.title,
        currency: input.currency,
        phone: input.phone,
        email: input.email,
        address: input.address,
    };
    return req;
}
exports.toCreateOrderRequestJSON = toCreateOrderRequestJSON;
function toCreateOrderResponse(input) {
    const res = {
        returnCode: input.return_code,
        returnMessage: input.return_message,
        subReturnCode: input.sub_return_code,
        subReturnMessage: input.sub_return_message,
        orderUrl: input.order_url,
        zpTransToken: input.zp_trans_token,
    };
    return res;
}
exports.toCreateOrderResponse = toCreateOrderResponse;
function toQueryOrderRequestJSON(input) {
    const req = {
        app_id: input.appId,
        app_trans_id: input.appTransId,
        mac: input.mac,
    };
    return req;
}
exports.toQueryOrderRequestJSON = toQueryOrderRequestJSON;
function toQueryOrderResponse(input) {
    const res = {
        returnCode: input.return_code,
        returnMessage: input.return_message,
        subReturnCode: input.sub_return_code,
        subReturnMessage: input.sub_return_message,
        isProcessing: input.is_processing,
        zpTransId: input.zp_trans_id,
        amount: input.amount,
    };
    return res;
}
exports.toQueryOrderResponse = toQueryOrderResponse;
