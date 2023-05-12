import nock from "nock";
import { createClient } from "./__mocks__/base";
import { ZaloPayClient } from "../zaloPayClient";
import { OrderAPI } from "../services";
import { OrderCreateRequest, OrderQueryRequest } from "../models/models";
import { createOrderSuccess, queryOrderSuccess } from "./__mocks__/order/responses";

let client: ZaloPayClient;
let orderAPI: OrderAPI;
let scope: nock.Scope;

beforeEach((): void => {
  if (!nock.isActive()) {
    nock.activate();
  }
  client = createClient();
  orderAPI = new OrderAPI(client);
  scope = nock("https://sb-openapi.zalopay.vn");
});

afterEach(() => {
  nock.cleanAll();
});

describe("Order API", () => {
  test("should create order", async (): Promise<void> => {
    scope.post("/v2/create")
      .reply(200, createOrderSuccess);

    const request: OrderCreateRequest = {
      app_user: "user123",
      app_trans_id: "230407_13221300383",
      app_time: 1680848533635,
      amount: 50000,
      description: "order",
      item: "item",
      embed_data: "{}"
    };
    const response = await orderAPI.create(request);

    expect(response.return_code).toEqual(1);
    expect(response.sub_return_code).toEqual(1);
  });
  test("should query order", async (): Promise<void> => {
    scope.post("/v2/query")
      .reply(200, queryOrderSuccess);

    const request: OrderQueryRequest = {
      app_trans_id: "230407_13221300383",
    };
    const response = await orderAPI.query(request);

    expect(response.return_code).toEqual(1);
    expect(response.sub_return_code).toEqual(1);
    expect(response.is_processing).toEqual(false);
  });
});