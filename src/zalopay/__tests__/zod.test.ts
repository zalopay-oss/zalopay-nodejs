import nock from "nock";
import { createClient } from "./__mocks__/base";
import { ZaloPayClient } from "../zaloPayClient";
import { ZodAPI } from "../services";
import {
  createInvoiceSuccess,
  queryInvoiceSuccess,
  queryStatusSuccess
} from "./__mocks__/zod/responses";
import { ZodCreateInvoiceRequest } from "../models/zodCreateInvoiceRequest";

let client: ZaloPayClient;
let zodAPI: ZodAPI;
let scope: nock.Scope;

beforeEach((): void => {
  if (!nock.isActive()) {
    nock.activate();
  }
  client = createClient();
  zodAPI = new ZodAPI(client);
  scope = nock("https://sbapimep.zalopay.vn");
});

afterEach(() => {
  nock.cleanAll();
});

describe("ZOD API", () => {
  test("should create invoice", async (): Promise<void> => {
    scope.post("/v2/zod").reply(200, createInvoiceSuccess);

    const request: ZodCreateInvoiceRequest = {
      mcRefId: "230525_26596",
      amount: 2000,
      receiver: {
        contact: "012345789"
      },
      orderInfo: [
        {
          trackingNumber: "123"
        }
      ],
      mcExtInfo: "{}"
    };
    const response = await zodAPI.createInvoice(request);

    expect(response.orderUrl).toEqual(
      "https://zlpqc-onlpm-zod.zalopay.vn/zod/0a553-230525_77222"
    );
  });
  test("should query invoice information success", async (): Promise<void> => {
    scope
      .get("/v2/zod/invoice")
      .query(actualQueryObject => {
        if (
          actualQueryObject.mac &&
          actualQueryObject.appId === "2554" &&
          actualQueryObject.mcRefId === "230525_26596"
        ) {
          return true;
        }
        return false;
      })
      .reply(200, queryInvoiceSuccess);

    const response = await zodAPI.queryInvoice("230525_26596");

    expect(response.orderUrl).toEqual(
      "https://zlpqc-onlpm-zod.zalopay.vn/zod/0a553-230525_77222"
    );
  });
  test("should query invoice status success", async (): Promise<void> => {
    scope
      .get("/v2/zod/status")
      .query(actualQueryObject => {
        if (
          actualQueryObject.mac &&
          actualQueryObject.appId === "2554" &&
          actualQueryObject.mcRefId === "230525_26596"
        ) {
          return true;
        }
        return false;
      })
      .reply(200, queryStatusSuccess);

    const response = await zodAPI.queryStatus("230525_26596");

    expect(response.amount).toEqual("430000");
    expect(response.status).toEqual(1);
  });
});
