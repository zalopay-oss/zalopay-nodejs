import getJsonResponse from "../helpers/getJsonResponse";
import {
  ObjectSerializer,
  ZodCreateInvoiceRequest,
  ZodCreateInvoiceResponse,
  ZodQueryInvoiceResponse,
  ZodQueryStatusResponse
} from "../models/models";
import Service from "../service";
import HmacUtils from "../utils/hmacUtils";
import { ZaloPayClient } from "../zaloPayClient";
import ZodResource from "./resource/zodResource";

class Zod extends Service {
  private readonly _create: ZodResource;
  private readonly _query_invoice: ZodResource;
  private readonly _query_status: ZodResource;

  private hmacUtils: HmacUtils;

  public constructor(client: ZaloPayClient) {
    client.httpClient.defaults.baseURL =
      client.config.env === "sandbox"
        ? "https://sbapimep.zalopay.vn"
        : "https://apimep.zalopay.vn/";
    super(client);
    this._create = new ZodResource(this, "/v2/zod");
    this._query_invoice = new ZodResource(this, "/v2/zod/invoice");
    this._query_status = new ZodResource(this, "/v2/zod/status");
    this.hmacUtils = new HmacUtils();
  }

  public async createInvoice(
    createRequest: ZodCreateInvoiceRequest
  ): Promise<ZodCreateInvoiceResponse> {
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
      ZodCreateInvoiceRequest,
      ZodCreateInvoiceResponse
    >(this._create, "post", createRequest);
    return ObjectSerializer.deserialize(response, "ZodCreateInvoiceResponse");
  }

  public async queryInvoice(
    mcRefId: string,
    appId?: string
  ): Promise<ZodQueryInvoiceResponse> {
    const requestAppId = (appId ||= this.config.appId);
    const dataSign = [requestAppId, mcRefId].join(HmacUtils.DATA_SEPARATOR);
    const mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);

    const requestParams = {
      appId: requestAppId,
      mcRefId: mcRefId,
      mac: mac
    };
    const response = await getJsonResponse<string, ZodQueryInvoiceResponse>(
      this._query_invoice,
      "get",
      "",
      {
        params: new URLSearchParams(requestParams)
      }
    );
    return ObjectSerializer.deserialize(response, "ZodQueryInvoiceResponse");
  }

  public async queryStatus(
    mcRefId: string,
    appId?: string
  ): Promise<ZodQueryStatusResponse> {
    const requestAppId = (appId ||= this.config.appId);
    const dataSign = [requestAppId, mcRefId].join(HmacUtils.DATA_SEPARATOR);
    const mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);

    const requestParams = {
      appId: requestAppId,
      mcRefId: mcRefId,
      mac: mac
    };

    const response = await getJsonResponse<string, ZodQueryStatusResponse>(
      this._query_status,
      "get",
      "",
      {
        params: new URLSearchParams(requestParams)
      }
    );
    return ObjectSerializer.deserialize(response, "ZodQueryStatusResponse");
  }
}

export default Zod;
