import {ZaloPayClient} from "../../zaloPayClient";
import {TokenizationAPI} from "../../services";
import nock from "nock";
import {createClient} from "../__mocks__/base";
import {bindingSuccess} from "../__mocks__/tokenization/responses";
import {AgreementBindRequest} from "../../../../typings/agreementBindRequest";

let client: ZaloPayClient;
let tokenizationAPI: TokenizationAPI;
let scope: nock.Scope;

beforeEach((): void => {
    if (!nock.isActive()) {
        nock.activate();
    }
    client = createClient();
    tokenizationAPI = new TokenizationAPI(client);
    scope = nock(`https://sb-openapi.zalopay.vn/v2`);
});

afterEach(() => {
    nock.cleanAll();
});

describe("Tokenization API", (): void => {
    test("should create binding", async (): Promise<void> => {
        scope.post("/agreement/bind")
            .reply(200, bindingSuccess)
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
    });
});
