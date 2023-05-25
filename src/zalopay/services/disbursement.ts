import { ZaloPayClient } from "../zaloPayClient";
import Service from "../service";
import getJsonResponse from "../helpers/getJsonResponse";
import {
  DisbursementQueryMerchantBalanceRequest,
  DisbursementQueryMerchantBalanceResponse,
  DisbursementQueryOrderRequest,
  DisbursementQueryOrderResponse,
  DisbursementQueryUserRequest,
  DisbursementQueryUserResponse,
  DisbursementTopupRequest,
  DisbursementTopupResponse,
  ObjectSerializer
} from "../models/models";
import HmacUtils from "../utils/hmacUtils";
import DisbursementResource from "./resource/disbursementResource";
import RSAUtils from "../utils/rsaUtils";

class Disbursement extends Service {
  private readonly _query_merchant_balance: DisbursementResource;
  private readonly _query_user: DisbursementResource;

  private readonly _topup: DisbursementResource;
  private readonly _query_order: DisbursementResource;

  private readonly hmacUtils: HmacUtils;
  private readonly rsaUtils: RSAUtils;

  public constructor(client: ZaloPayClient) {
    super(client);
    if (!client.config.paymentId || !client.config.privateKey) {
      throw new Error(
        "The paymentId and privateKey config keys are required for Disbursement service"
      );
    }
    this._query_merchant_balance = new DisbursementResource(
      this,
      "/v2/disbursement/balance"
    );
    this._query_user = new DisbursementResource(this, "/v2/disbursement/user");
    this._topup = new DisbursementResource(this, "/v2/disbursement/topup");
    this._query_order = new DisbursementResource(this, "/v2/disbursement/txn");

    this.hmacUtils = new HmacUtils();
    this.rsaUtils = RSAUtils.fromConfig(client.config, { scheme: "pkcs8" });
  }

  public async queryMerchantBalance(
    balanceRequest: DisbursementQueryMerchantBalanceRequest
  ): Promise<DisbursementQueryMerchantBalanceResponse> {
    balanceRequest.app_id ||= +this.config.appId;
    balanceRequest.payment_id =
      balanceRequest.payment_id ?? this.config.paymentId;
    const dataSign = [
      balanceRequest.app_id,
      balanceRequest.payment_id,
      balanceRequest.time
    ].join(HmacUtils.DATA_SEPARATOR);
    balanceRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      DisbursementQueryMerchantBalanceRequest,
      DisbursementQueryMerchantBalanceResponse
    >(this._query_merchant_balance, "post", balanceRequest);
    return ObjectSerializer.deserialize(
      response,
      "DisbursementQueryMerchantBalanceResponse"
    );
  }

  public async queryUser(
    queryUserRequest: DisbursementQueryUserRequest
  ): Promise<DisbursementQueryUserResponse> {
    queryUserRequest.app_id ||= +this.config.appId;
    const dataSign = [
      queryUserRequest.app_id,
      queryUserRequest.phone,
      queryUserRequest.time
    ].join(HmacUtils.DATA_SEPARATOR);
    queryUserRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      DisbursementQueryUserRequest,
      DisbursementQueryUserResponse
    >(this._query_user, "post", queryUserRequest);
    return ObjectSerializer.deserialize(
      response,
      "DisbursementQueryUserResponse"
    );
  }

  public async topup(
    payRequest: DisbursementTopupRequest
  ): Promise<DisbursementTopupResponse> {
    payRequest.app_id ||= +this.config.appId;
    payRequest.payment_id = payRequest.payment_id ?? this.config.paymentId;
    const dataSign = [
      payRequest.app_id,
      payRequest.payment_id,
      payRequest.partner_order_id,
      payRequest.m_u_id,
      payRequest.amount,
      payRequest.description,
      payRequest.partner_embed_data,
      payRequest.extra_info,
      payRequest.time
    ].join(HmacUtils.DATA_SEPARATOR);
    const mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    payRequest.sig = this.rsaUtils.sign(mac, "base64", "utf8");
    const response = await getJsonResponse<
      DisbursementTopupRequest,
      DisbursementTopupResponse
    >(this._topup, "post", payRequest);
    return ObjectSerializer.deserialize(response, "DisbursementTopupResponse");
  }

  public async queryOrder(
    queryRequest: DisbursementQueryOrderRequest
  ): Promise<DisbursementQueryOrderResponse> {
    queryRequest.app_id ||= +this.config.appId;
    const dataSign = [
      queryRequest.app_id,
      queryRequest.partner_order_id,
      queryRequest.time
    ].join(HmacUtils.DATA_SEPARATOR);
    queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<
      DisbursementQueryOrderRequest,
      DisbursementQueryOrderResponse
    >(this._query_order, "post", queryRequest);
    return ObjectSerializer.deserialize(
      response,
      "DisbursementQueryOrderResponse"
    );
  }
}

export default Disbursement;
