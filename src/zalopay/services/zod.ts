import getJsonResponse from "../helpers/getJsonResponse";
import {
  ObjectSerializer,
  ZODCreateInvoiceRequest,
  ZODCreateInvoiceResponse,
  ZODQueryInvoiceResponse,
  ZODQueryStatusResponse
} from "../models/models";
import Service from "../service";
import HmacUtils from "../utils/hmacUtils";
import { ZaloPayClient } from "../zaloPayClient";
import ZODResource from "./resource/zodResource";

class ZOD extends Service {
  private readonly _create: ZODResource;
  private readonly _query_invoice: ZODResource;
  private readonly _query_status: ZODResource;

  private hmacUtils: HmacUtils;

  public constructor(client: ZaloPayClient) {
    client.httpClient.defaults.baseURL =
      client.config.env === "sandbox"
        ? "https://sbapimep.zalopay.vn"
        : "https://apimep.zalopay.vn/";
    super(client);
    this._create = new ZODResource(this, "/v2/zod");
    this._query_invoice = new ZODResource(this, "/v2/zod/invoice");
    this._query_status = new ZODResource(this, "/v2/zod/status");
    this.hmacUtils = new HmacUtils();
  }

  public async createInvoice(
    createRequest: ZODCreateInvoiceRequest
  ): Promise<ZODCreateInvoiceResponse> {
    createRequest.appId ||= this.config.appId;
    const dataSign = [
      createRequest.appId,
      createRequest.mcRefId,
      createRequest.amount,
      createRequest.mcExtInfo
    ].join(HmacUtils.DATA_SEPARATOR);
    createRequest.mac = this.hmacUtils.calculateHmac(
      dataSign,
      this.config.key1
    );
    const response = await getJsonResponse<
      ZODCreateInvoiceRequest,
      ZODCreateInvoiceResponse
    >(this._create, "post", createRequest);
    return ObjectSerializer.deserialize(response, "ZODCreateInvoiceResponse");
  }

  public async queryInvoice(
    mcRefId: string,
    appId?: string
  ): Promise<ZODQueryInvoiceResponse> {
    const requestAppId = (appId ||= this.config.appId);
    const dataSign = [requestAppId, mcRefId].join(HmacUtils.DATA_SEPARATOR);
    const mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);

    const requestParam = {
      appId: requestAppId,
      mcRefId: mcRefId,
      mac: mac
    };
    const response = await getJsonResponse<string, ZODQueryInvoiceResponse>(
      this._query_invoice,
      "get",
      "",
      {
        params: new URLSearchParams(requestParam)
      }
    );
    return ObjectSerializer.deserialize(response, "ZODQueryInvoiceResponse");
  }

  public async queryStatus(
    mcRefId: string,
    appId?: string
  ): Promise<ZODQueryStatusResponse> {
    const requestAppId = (appId ||= this.config.appId);
    const dataSign = [requestAppId, mcRefId].join(HmacUtils.DATA_SEPARATOR);
    const mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);

    const requestParam = {
      appId: requestAppId,
      mcRefId: mcRefId,
      mac: mac
    };

    const response = await getJsonResponse<string, ZODQueryStatusResponse>(
      this._query_status,
      "get",
      "",
      {
        params: new URLSearchParams(requestParam)
      }
    );
    return ObjectSerializer.deserialize(response, "ZODQueryStatusResponse");
  }
}

export default ZOD;
