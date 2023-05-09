import {ZaloPayClient} from "../zaloPayClient";
import {TokenizationAPI} from "../services";
import nock from "nock";
import {createClient} from "./__mocks__/base";
import {
    bindingSuccess,
    queryBalanceSuccess,
    queryBindingSuccess, queryUserSuccess, submitPayProcessing,
    unbindSuccess
} from "./__mocks__/tokenization/responses";
import {AgreementBindRequest} from "../models/agreementBindRequest";
import {AgreementUnbindRequest} from "../models/agreementUnbindRequest";
import {AgreementQueryRequest} from "../models/agreementQueryRequest";
import {AgreementBalanceRequest} from "../models/agreementBalanceRequest";
import {AgreementPayRequest} from "../models/agreementPayRequest";
import {AgreementQueryUserRequest} from "../models/agreementQueryUserRequest";

let client: ZaloPayClient;
let tokenizationAPI: TokenizationAPI;
let scope: nock.Scope;

beforeEach((): void => {
    if (!nock.isActive()) {
        nock.activate();
    }
    client = createClient();
    tokenizationAPI = new TokenizationAPI(client);
    scope = nock("https://sb-openapi.zalopay.vn");
});

afterEach(() => {
    nock.cleanAll();
});

describe("Tokenization API", (): void => {
    test("should create binding", async (): Promise<void> => {
        scope.post("/v2/agreement/bind")
            .reply(200, bindingSuccess);
        const request = new AgreementBindRequest();
        // exclude app_id, mac
        request.binding_data = "";
        request.app_trans_id = "230407_13221300383";
        request.binding_type = AgreementBindRequest.BindingTypeEnum.Wallet;
        request.identifier = "84903863801";
        request.max_amount = 0;
        request.redirect_url = "";
        request.redirect_deep_link = "";
        request.callback_url = "";
        request.req_date = 1680848533635;
        const response = await tokenizationAPI.bind(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
    });

    test("should delete binding", async (): Promise<void> => {
        scope.post("/v2/agreement/unbind")
            .reply(200, unbindSuccess);
        const request = new AgreementUnbindRequest();
        // exclude app_id, mac
        request.identifier = "84903863801";
        request.binding_id = "230407qQe7vGnqp0agyforLAy0D2b1x3";
        request.req_date = 1680848533635;
        const response = await tokenizationAPI.unbind(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
    });

    test("should get payment token of a binding", async (): Promise<void> => {
        scope.post("/v2/agreement/query")
            .reply(200, queryBindingSuccess);
        const request = new AgreementQueryRequest();
        // exclude app_id, mac
        request.app_trans_id = "230407_13221300383";
        request.req_date = 1680848533635;
        const response = await tokenizationAPI.query(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.data?.pay_token).toEqual("NJLHNTRLZDETZGQYZI0ZNTBKLTGWZJKTMTKXYJHLMWI5NTFI");
    });

    test("should get the balance of user", async (): Promise<void> => {
        scope.post("/v2/agreement/balance")
            .reply(200, queryBalanceSuccess);
        const request = new AgreementBalanceRequest();
        // exclude app_id, mac
        request.identifier = "84903863801";
        request.pay_token = "NJLHNTRLZDETZGQYZI0ZNTBKLTGWZJKTMTKXYJHLMWI5NTFI";
        request.amount = 50000;
        // request.req_date = 1680848533635;
        const response = await tokenizationAPI.balance(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.data?.length).toEqual(1);
        expect(response.data?.[0].channel).toEqual(38);
        expect(response.data?.[0].payable).toEqual(true);
    });

    test("should submit payment after creating order", async (): Promise<void> => {
        scope.post("/v2/agreement/pay")
            .reply(200, submitPayProcessing);
        const request = new AgreementPayRequest();
        // exclude app_id, mac
        request.identifier = "84903863801";
        request.pay_token = "NJLHNTRLZDETZGQYZI0ZNTBKLTGWZJKTMTKXYJHLMWI5NTFI";
        request.zp_trans_token = "ACWH4QMH_wQUF_PxXGs4X4pg";
        request.req_date = 1680848533635;
        const response = await tokenizationAPI.pay(request);
        expect(response.return_code).toEqual(3);
        expect(response.sub_return_code).toEqual(3);
        expect(response.app_trans_id).toEqual("230407_13583500399");
        expect(response.zp_trans_id).toEqual(230407000006575);
    });

    test("should get the the basic user information", async (): Promise<void> => {
        scope.post("/v2/agreement/query_user")
            .reply(200, queryUserSuccess);
        const request = new AgreementQueryUserRequest();
        // exclude app_id, mac
        request.access_token = "ZJVKY2M3OTYTNZUZYY0ZZWYZLWJMNJITZJRHZMUXOWM5YMUX";
        request.req_date = 1680848533635;
        const response = await tokenizationAPI.queryUser(request);
        expect(response.return_code).toEqual(1);
        expect(response.sub_return_code).toEqual(1);
        expect(response.phone).toEqual("****2606");
    });
});
