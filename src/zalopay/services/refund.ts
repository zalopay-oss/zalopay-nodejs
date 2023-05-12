import getJsonResponse from "../helpers/getJsonResponse";
import { ObjectSerializer, RefundQueryResponse } from "../models/models";
import { RefundCreateRequest } from "../models/refundCreateRequest";
import { RefundCreateResponse } from "../models/refundCreateResponse";
import { RefundQueryRequest } from "../models/refundQueryRequest";
import Service from "../service";
import HmacUtils from "../utils/hmacUtils";
import { ZaloPayClient } from "../zaloPayClient";
import RefundResource from "./resource/refundResource";

class Refund extends Service {
  private readonly _create: RefundResource;
  private readonly _query: RefundResource;

  private hmacUtils: HmacUtils;

  public constructor(client: ZaloPayClient) {
    super(client);
    this._create = new RefundResource(this, "/v2/refund");
    this._query = new RefundResource(this, "/v2/query_refund");
    this.hmacUtils = new HmacUtils();
  }

  public async create(createRequest: RefundCreateRequest): Promise<RefundCreateResponse> {
    createRequest.app_id ||= +this.config.appId;
    const dataSign: string = this.getDataToSign(createRequest);
    createRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<RefundCreateRequest, RefundCreateResponse>(
      this._create,
      "post",
      createRequest,
    );
    return ObjectSerializer.deserialize(response, "RefundCreateResponse");
  }

  public async query(queryRequest: RefundQueryRequest): Promise<RefundQueryResponse> {
    queryRequest.app_id ||= +this.config.appId;
    const dataSign: string = this.getDataToSign(queryRequest);
    queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<RefundQueryRequest, RefundQueryResponse>(
      this._query,
      "post",
      queryRequest,
    );
    return ObjectSerializer.deserialize(response, "RefundQueryResponse");
  }

  private getDataToSign(request:
    RefundCreateRequest
    | RefundQueryRequest): string {
    const data = [];
    if (request instanceof RefundCreateRequest) {
      data.push(request.app_id);
      data.push(request.zp_trans_id);
      data.push(request.amount);
      data.push(request.description);
      data.push(request.timestamp);
    } else { // OAQueryOrderRequest
      data.push(request.app_id);
      data.push(request.m_refund_id);
      data.push(request.timestamp);
    }
    return data.join(HmacUtils.DATA_SEPARATOR);
  }
}

export default Refund;
