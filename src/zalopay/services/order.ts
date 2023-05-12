import getJsonResponse from "../helpers/getJsonResponse";
import { ObjectSerializer, OrderCreateRequest, OrderCreateResponse, OrderQueryRequest, OrderQueryResponse } from "../models/models";
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

  public async create(createRequest: OrderCreateRequest): Promise<OrderCreateResponse> {
    createRequest.app_id ||= +this.config.appId;
    const dataSign: string = this.getDataToSign(createRequest);
    createRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<OrderCreateRequest, OrderCreateResponse>(
      this._create,
      "post",
      createRequest,
    );
    return ObjectSerializer.deserialize(response, "OrderCreateResponse");
  }

  public async query(queryRequest: OrderQueryRequest): Promise<OrderQueryResponse> {
    queryRequest.app_id ||= +this.config.appId;
    const dataSign: string = this.getDataToSign(queryRequest);
    queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
    const response = await getJsonResponse<OrderQueryRequest, OrderQueryResponse>(
      this._query,
      "post",
      queryRequest,
    );
    return ObjectSerializer.deserialize(response, "OrderQueryResponse");
  }

  private getDataToSign(request:
    OrderQueryRequest
    | OrderCreateRequest): string {
    const data = [];
    if (request instanceof OrderCreateRequest) {
      data.push(request.app_id);
      data.push(request.app_trans_id);
      data.push(request.app_user);
      data.push(request.amount);
      data.push(request.app_time);
      data.push(request.embed_data);
      data.push(request.item);
    } else { // OAQueryOrderRequest
      data.push(request.app_id);
      data.push(request.app_trans_id);
    }
    return data.join(HmacUtils.DATA_SEPARATOR);
  }
}

export default Order;