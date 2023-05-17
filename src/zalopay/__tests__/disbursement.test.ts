import { ZaloPayClient } from "../zaloPayClient";
import { DisbursementAPI } from "../services";
import nock from "nock";
import { createClient } from "./__mocks__/base";
import {
    queryMerchantBalanceSuccess,
    queryUserSuccess,
    topupSuccess,
    queryOrderSuccess,
} from "./__mocks__/disbursement/responses";

import { DisbursementQueryMerchantBalanceRequest } from "../models/disbursementQueryMerchantBalanceRequest";
import { DisbursementQueryUserRequest } from "../models/disbursementQueryUserRequest";
import { DisbursementTopupRequest } from "../models/disbursementTopupRequest";
import { DisbursementQueryOrderRequest } from "../models/disbursementQueryOrderRequest";
import { Config } from "../utils/Config";

let client: ZaloPayClient;
let disbursementAPI: DisbursementAPI;
let scope: nock.Scope;

beforeEach((): void => {
    if (!nock.isActive()) {
        nock.activate();
    }
    client = createClient();
    disbursementAPI = new DisbursementAPI(client);
    scope = nock("https://sb-openapi.zalopay.vn");
});

afterEach(() => {
    nock.cleanAll();
});

describe("Disbursement API", (): void => {
    test("should throw an error if paymentId or privateKey are not in the config", () => {
        const errorMessage = "The paymentId and privateKey config keys are required for Disbursement service";
        const clientWithoutPaymentIdAndPrivateKey = new ZaloPayClient({} as Config);
        expect(() => new DisbursementAPI(clientWithoutPaymentIdAndPrivateKey)).toThrow(errorMessage);
        const clientWithoutPrivateKey = new ZaloPayClient({ paymentId: "1234" } as Config);
        expect(() => new DisbursementAPI(clientWithoutPrivateKey)).toThrow(errorMessage);
    });

    test("should query merchant balance", async (): Promise<void> => {
        scope.post("/v2/disbursement/balance")
            .reply(200, queryMerchantBalanceSuccess);
        // exclude app_id, mac
        const request: DisbursementQueryMerchantBalanceRequest = {
            time: Date.now(),
        };
        const response = await disbursementAPI.queryMerchantBalance(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.data?.balance).toEqual(1000000000);
    });

    test("should query user succcessful", async (): Promise<void> => {
        scope.post("/v2/disbursement/user")
            .reply(200, queryUserSuccess);
        // exclude app_id, mac
        const request: DisbursementQueryUserRequest = {
            phone: "0904123456",
            time: Date.now(),
        };
        const response = await disbursementAPI.queryUser(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.data?.name).toEqual("Nguyen Van A");
        expect(response.data?.phone).toEqual("0904123456");
        expect(response.data?.m_u_id).toEqual("230407qQe7vGnqp0agyforLAy0D2b1x3");
    });

    test("should topup successful", async (): Promise<void> => {
        scope.post("/v2/disbursement/topup")
            .reply(200, topupSuccess);
        // exclude app_id, mac
        const request: DisbursementTopupRequest = {
            partner_order_id: "84903863801",
            m_u_id: "230407qQe7vGnqp0agyforLAy0D2b1x3",
            amount: 50000,
            description: "Topup for Nguyen Van A",
            partner_embed_data: "{}",
            reference_id: "Topup",
            extra_info: "{}",
            time: Date.now(),
        };
        const response = await disbursementAPI.topup(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.data?.order_id).toEqual("202305110902928474");
        expect(response.data?.status).toEqual(3);
        expect(response.data?.m_u_id).toEqual("230407qQe7vGnqp0agyforLAy0D2b1x3");
        expect(response.data?.phone).toEqual("0904123456");
        expect(response.data?.amount).toEqual(1000);
        expect(response.data?.description).toEqual("Topup for Nguyen Van A");
        expect(response.data?.partner_fee).toEqual(0);
        expect(response.data?.zlp_fee).toEqual(0);
        expect(response.data?.extra_info).toEqual("{}");
    });

    test("should query order successful", async (): Promise<void> => {
        scope.post("/v2/disbursement/txn")
            .reply(200, queryOrderSuccess);
        // exclude app_id, mac
        const request: DisbursementQueryOrderRequest = {
            partner_order_id: "84903863801",
            time: Date.now(),
        };
        const response = await disbursementAPI.queryOrder(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.data?.order_id).toEqual("202305110902928474");
        expect(response.data?.status).toEqual(1);
        expect(response.data?.m_u_id).toEqual("230407qQe7vGnqp0agyforLAy0D2b1x3");
        expect(response.data?.phone).toEqual("0904123456");
        expect(response.data?.amount).toEqual(1000);
        expect(response.data?.description).toEqual("Topup for Nguyen Van A");
        expect(response.data?.partner_fee).toEqual(0);
        expect(response.data?.zlp_fee).toEqual(0);
        expect(response.data?.extra_info).toEqual("{}");
    });

});
