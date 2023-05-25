import getJsonResponse from "../helpers/getJsonResponse";
import {
  ObjectSerializer,
  OrderCreateRequest,
  OrderCreateResponse,
  OrderQueryRequest,
  OrderQueryResponse
} from "../models/models";
import Service from "../service";
import HmacUtils from "../utils/hmacUtils";
import { ZaloPayClient } from "../zaloPayClient";
import OrderResource from "./resource/orderResource";

class Order extends Service {
  private readonly _create: OrderResource;
  private readonly _query: OrderResource;

  private hmacUtils: HmacUtils;

  public constructor(client: ZaloPayClient) {
    super(client);
    this._create = new OrderResource(this, "/v2/create");
    this._query = new OrderResource(this, "/v2/query");
    this.hmacUtils = new HmacUtils();
  }

  public async create(
    createRequest: OrderCreateRequest
  ): Promise<OrderCreateResponse> {
    createRequest.app_id ||= +this.config.appId;
    const dataSign = [
      createRequest.app_id,
      createRequest.app_trans_id,
      createRequest.app_user,
      createRequest.amount,
      createRequest.app_time,
      createRequest.embed_data,
      createRequest.item
    ].join(HmacUtils.DATA_SEPARATOR);
    createRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      OrderCreateRequest,
      OrderCreateResponse
    >(this._create, "post", createRequest);
    return ObjectSerializer.deserialize(response, "OrderCreateResponse");
  }

  public async query(
    queryRequest: OrderQueryRequest
  ): Promise<OrderQueryResponse> {
    queryRequest.app_id ||= +this.config.appId;
    const dataSign = [
      queryRequest.app_id,
      queryRequest.app_trans_id,
      this.config.key1
    ].join(HmacUtils.DATA_SEPARATOR);
    queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<
      OrderQueryRequest,
      OrderQueryResponse
    >(this._query, "post", queryRequest);
    return ObjectSerializer.deserialize(response, "OrderQueryResponse");
  }
}

export default Order;
