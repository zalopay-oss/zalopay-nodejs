import nock from "nock";
import { createClient } from "./__mocks__/base";
import { ZaloPayClient } from "../zaloPayClient";
import { RefundAPI } from "../services";
import { refundCreateSuccess, refundQuerySuccess } from "./__mocks__/refund/responses";
import { RefundCreateRequest } from "../models/refundCreateRequest";
import { RefundQueryRequest } from "../models/refundQueryRequest";

let client: ZaloPayClient;
let refundAPI: RefundAPI;
let scope: nock.Scope;

beforeEach((): void => {
  if (!nock.isActive()) {
    nock.activate();
  }
  client = createClient();
  refundAPI = new RefundAPI(client);
  scope = nock("https://sb-openapi.zalopay.vn");
});

afterEach(() => {
  nock.cleanAll();
});

describe("Refund API", () => {
  test("should create refund", async (): Promise<void> => {
    scope.post("/v2/refund")
      .reply(200, refundCreateSuccess);

    const request: RefundCreateRequest = {
      m_refund_id: "230407_2554_13221300383",
      zp_trans_id: "1680848533635",
      amount: 50000,
      timestamp: 1680848533635,
      description: "refund",
    };
    const response = await refundAPI.create(request);

    expect(response.return_code).toEqual(1);
    expect(response.sub_return_code).toEqual(1);
  });
  test("should query refund", async (): Promise<void> => {
    scope.post("/v2/query_refund")
      .reply(200, refundQuerySuccess);

    const request: RefundQueryRequest = {
      m_refund_id: "230407_2554_13221300383",
      timestamp: 1680848533635
    };
    const response = await refundAPI.query(request);

    expect(response.return_code).toEqual(1);
    expect(response.sub_return_code).toEqual(1);
  });
});