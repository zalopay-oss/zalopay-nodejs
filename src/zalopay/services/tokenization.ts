import {ZaloPayClient} from "../ZaloPayClient";
import Service from "../service";
import {AgreementBindRequest} from "../../../typings/agreementBindRequest";
import {AgreementBindResponse} from "../../../typings/agreementBindResponse";
import TokenizationResource from "./resource/tokenizationResource";
import getJsonResponse from "../helpers/getJsonResponse";
import {
    AgreementBalanceRequest,
    AgreementBalanceResponse,
    AgreementPayRequest,
    AgreementQueryRequest,
    AgreementQueryResponse,
    AgreementQueryUserRequest,
    AgreementQueryUserResponse,
    AgreementUnbindResponse,
    OACommonResponse,
    ObjectSerializer
} from "../../../typings/models";

export class Tokenization extends Service {
    private readonly _bind: TokenizationResource;
    private readonly _unbind: TokenizationResource;
    private readonly _query: TokenizationResource;
    private readonly _balance: TokenizationResource;
    private readonly _pay: TokenizationResource;
    private readonly _query_user: TokenizationResource;

    public constructor(client: ZaloPayClient) {
        super(client);
        this._bind = new TokenizationResource(this, "/agreement/bind");
        this._unbind = new TokenizationResource(this, "/agreement/unbind");
        this._query = new TokenizationResource(this, "/agreement/query");
        this._balance = new TokenizationResource(this, "/agreement/balance");
        this._pay = new TokenizationResource(this, "/agreement/pay");
        this._query_user = new TokenizationResource(this, "/agreement/query_user");
    }

    public async bind(bindRequest: AgreementBindRequest): Promise<AgreementBindResponse> {
        bindRequest.app_id ||= +this.config.appId;
        bindRequest.mac = "";
        const response = await getJsonResponse<AgreementBindRequest, AgreementBindResponse>(
            this._bind,
            "post",
            bindRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementBindResponse");
    }

    public async unbind(unbindRequest: AgreementQueryUserRequest): Promise<AgreementUnbindResponse> {
        unbindRequest.app_id ||= +this.config.appId;
        unbindRequest.mac = "";
        const response = await getJsonResponse<AgreementQueryUserRequest, AgreementUnbindResponse>(
            this._unbind,
            "post",
            unbindRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementUnbindResponse");
    }

    public async pay(unbindRequest: AgreementPayRequest): Promise<OACommonResponse> {
        unbindRequest.app_id ||= +this.config.appId;
        unbindRequest.mac = "";
        const response = await getJsonResponse<AgreementQueryUserRequest, OACommonResponse>(
            this._pay,
            "post",
            unbindRequest,
        );
        return ObjectSerializer.deserialize(response, "OACommonResponse");
    }

    public async query(agreementQueryRequest: AgreementQueryRequest): Promise<AgreementQueryResponse> {
        agreementQueryRequest.app_id ||= +this.config.appId;
        agreementQueryRequest.mac = "";
        const response = await getJsonResponse<AgreementQueryRequest, AgreementQueryResponse>(
            this._query,
            "post",
            agreementQueryRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementQueryResponse");
    }

    public async balance(agreementBalanceRequest: AgreementBalanceRequest): Promise<AgreementBalanceResponse> {
        agreementBalanceRequest.app_id ||= +this.config.appId;
        agreementBalanceRequest.mac = "";
        const response = await getJsonResponse<AgreementBalanceRequest, AgreementBalanceResponse>(
            this._balance,
            "post",
            agreementBalanceRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementBalanceResponse");
    }

    public async queryUser(agreementQueryUserRequest: AgreementQueryUserRequest): Promise<AgreementQueryUserResponse> {
        agreementQueryUserRequest.app_id ||= +this.config.appId;
        agreementQueryUserRequest.mac = "";
        const response = await getJsonResponse<AgreementQueryUserRequest, AgreementQueryUserResponse>(
            this._query_user,
            "post",
            agreementQueryUserRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementQueryUserResponse");
    }


}