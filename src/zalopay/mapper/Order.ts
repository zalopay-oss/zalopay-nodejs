import { CreateOrderRequestJSON, CreateOrderResponseJSON, QueryOrderRequestJSON, QueryOrderResponseJSON } from "../model/json/Order";
import { CreateOrderRequest, CreateOrderResponse, QueryOrderRequest, QueryOrderResponse } from "../model/Order";

export function toCreateOrderRequestJSON(input: CreateOrderRequest): CreateOrderRequestJSON {
  const req: CreateOrderRequestJSON = {
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
  }
  return req
}

export function toCreateOrderResponse(input: CreateOrderResponseJSON): CreateOrderResponse {
  const res: CreateOrderResponse = {
    returnCode: input.return_code,
    returnMessage: input.return_message,
    subReturnCode: input.sub_return_code,
    subReturnMessage: input.sub_return_message,
    orderUrl: input.order_url,
    zpTransToken: input.zp_trans_token,
  }
  return res
}

export function toQueryOrderRequestJSON(input: QueryOrderRequest): QueryOrderRequestJSON {
  const req: QueryOrderRequestJSON = {
    app_id: input.appId,
    app_trans_id: input.appTransId,
    mac: input.mac,
  }
  return req
}

export function toQueryOrderResponse(input: QueryOrderResponseJSON): QueryOrderResponse {
  const res: QueryOrderResponse = {
    returnCode: input.return_code,
    returnMessage: input.return_message,
    subReturnCode: input.sub_return_code,
    subReturnMessage: input.sub_return_message,
    isProcessing: input.is_processing,
    zpTransId: input.zp_trans_id,
    amount: input.amount,
  }
  return res
}