import { ZaloPayClient } from "../zaloPayClient";
import Service from "../service";
import { AgreementBindRequest } from "../models/agreementBindRequest";
import { AgreementBindResponse } from "../models/agreementBindResponse";
import TokenizationResource from "./resource/tokenizationResource";
import getJsonResponse from "../helpers/getJsonResponse";
import {
  AgreementBalanceRequest,
  AgreementBalanceResponse,
  AgreementPayRequest,
  AgreementPayResponse,
  AgreementQueryRequest,
  AgreementQueryResponse,
  AgreementQueryUserRequest,
  AgreementQueryUserResponse,
  AgreementUnbindRequest,
  AgreementUnbindResponse,
  ObjectSerializer
} from "../models/models";
import HmacUtils from "../utils/hmacUtils";

class Tokenization extends Service {
  private readonly _bind: TokenizationResource;
  private readonly _unbind: TokenizationResource;
  private readonly _query: TokenizationResource;
  private readonly _balance: TokenizationResource;
  private readonly _pay: TokenizationResource;
  private readonly _query_user: TokenizationResource;

  private hmacUtils: HmacUtils;

  public constructor(client: ZaloPayClient) {
    super(client);
    this._bind = new TokenizationResource(this, "/v2/agreement/bind");
    this._unbind = new TokenizationResource(this, "/v2/agreement/unbind");
    this._query = new TokenizationResource(this, "/v2/agreement/query");
    this._balance = new TokenizationResource(this, "/v2/agreement/balance");
    this._pay = new TokenizationResource(this, "/v2/agreement/pay");
    this._query_user = new TokenizationResource(
      this,
      "/v2/agreement/query_user"
    );

    this.hmacUtils = new HmacUtils();
  }

  public async bind(
    bindRequest: AgreementBindRequest
  ): Promise<AgreementBindResponse> {
    bindRequest.app_id ||= +this.config.appId;
    const dataSign = [
      bindRequest.app_id,
      bindRequest.app_trans_id,
      bindRequest.binding_data,
      bindRequest.binding_type,
      bindRequest.identifier,
      bindRequest.max_amount,
      bindRequest.req_date
    ].join(HmacUtils.DATA_SEPARATOR);
    bindRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<
      AgreementBindRequest,
      AgreementBindResponse
    >(this._bind, "post", bindRequest);
    return ObjectSerializer.deserialize(response, "AgreementBindResponse");
  }

  public async unbind(
    unbindRequest: AgreementUnbindRequest
  ): Promise<AgreementUnbindResponse> {
    unbindRequest.app_id ||= +this.config.appId;
    const dataSign = [
      unbindRequest.app_id,
      unbindRequest.identifier,
      unbindRequest.binding_id,
      unbindRequest.req_date
    ].join(HmacUtils.DATA_SEPARATOR);
    unbindRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      AgreementQueryUserRequest,
      AgreementUnbindResponse
    >(this._unbind, "post", unbindRequest);
    return ObjectSerializer.deserialize(response, "AgreementUnbindResponse");
  }

  public async pay(
    payRequest: AgreementPayRequest
  ): Promise<AgreementPayResponse> {
    payRequest.app_id ||= +this.config.appId;
    const dataSign = [
      payRequest.app_id,
      payRequest.identifier,
      payRequest.zp_trans_token,
      payRequest.pay_token,
      payRequest.req_date
    ].join(HmacUtils.DATA_SEPARATOR);
    payRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<
      AgreementPayRequest,
      AgreementPayResponse
    >(this._pay, "post", payRequest);
    return ObjectSerializer.deserialize(response, "AgreementPayResponse");
  }

  public async query(
    queryRequest: AgreementQueryRequest
  ): Promise<AgreementQueryResponse> {
    queryRequest.app_id ||= +this.config.appId;
    const dataSign = [
      queryRequest.app_id,
      queryRequest.app_trans_id,
      queryRequest.req_date
    ].join(HmacUtils.DATA_SEPARATOR);
    queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<
      AgreementQueryRequest,
      AgreementQueryResponse
    >(this._query, "post", queryRequest);
    return ObjectSerializer.deserialize(response, "AgreementQueryResponse");
  }

  public async balance(
    balanceRequest: AgreementBalanceRequest
  ): Promise<AgreementBalanceResponse> {
    balanceRequest.app_id ||= +this.config.appId;
    const dataSign = [
      balanceRequest.app_id,
      balanceRequest.pay_token,
      balanceRequest.identifier,
      balanceRequest.amount,
      balanceRequest.req_date
    ].join(HmacUtils.DATA_SEPARATOR);
    balanceRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      AgreementBalanceRequest,
      AgreementBalanceResponse
    >(this._balance, "post", balanceRequest);
    return ObjectSerializer.deserialize(response, "AgreementBalanceResponse");
  }

  public async queryUser(
    queryUserRequest: AgreementQueryUserRequest
  ): Promise<AgreementQueryUserResponse> {
    queryUserRequest.app_id ||= +this.config.appId;
    const dataSign = [
      queryUserRequest.app_id,
      queryUserRequest.access_token,
      queryUserRequest.req_date
    ].join(HmacUtils.DATA_SEPARATOR);
    queryUserRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      AgreementQueryUserRequest,
      AgreementQueryUserResponse
    >(this._query_user, "post", queryUserRequest);
    return ObjectSerializer.deserialize(response, "AgreementQueryUserResponse");
  }
}

export default Tokenization;
