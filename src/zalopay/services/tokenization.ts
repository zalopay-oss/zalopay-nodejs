import {ZaloPayClient} from "../zaloPayClient";
import Service from "../service";
import {AgreementBindRequest} from "../models/agreementBindRequest";
import {AgreementBindResponse} from "../models/agreementBindResponse";
import TokenizationResource from "./resource/tokenizationResource";
import getJsonResponse from "../helpers/getJsonResponse";
import {
    AgreementBalanceRequest,
    AgreementBalanceResponse,
    AgreementPayRequest, AgreementPayResponse,
    AgreementQueryRequest,
    AgreementQueryResponse,
    AgreementQueryUserRequest,
    AgreementQueryUserResponse,
    AgreementUnbindRequest,
    AgreementUnbindResponse,
    OACommonResponse,
    ObjectSerializer
} from "../models/models";
import HmacUtils from "../utils/hmacUtils";

class Tokenization extends Service {
    private readonly _bind: TokenizationResource;
    private readonly _unbind: TokenizationResource;
    private readonly _query: TokenizationResource;
    private readonly _balance: TokenizationResource;
    private readonly _pay: TokenizationResource;
    private readonly _query_user: TokenizationResource;

    private hmacUtils: HmacUtils;

    public constructor(client: ZaloPayClient) {
        super(client);
        this._bind = new TokenizationResource(this, "/v2/agreement/bind");
        this._unbind = new TokenizationResource(this, "/v2/agreement/unbind");
        this._query = new TokenizationResource(this, "/v2/agreement/query");
        this._balance = new TokenizationResource(this, "/v2/agreement/balance");
        this._pay = new TokenizationResource(this, "/v2/agreement/pay");
        this._query_user = new TokenizationResource(this, "/v2/agreement/query_user");

        this.hmacUtils = new HmacUtils();
    }

    public async bind(bindRequest: AgreementBindRequest): Promise<AgreementBindResponse> {
        bindRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(bindRequest);
        bindRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<AgreementBindRequest, AgreementBindResponse>(
            this._bind,
            "post",
            bindRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementBindResponse");
    }

    public async unbind(unbindRequest: AgreementQueryUserRequest): Promise<AgreementUnbindResponse> {
        unbindRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(unbindRequest);
        unbindRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<AgreementQueryUserRequest, AgreementUnbindResponse>(
            this._unbind,
            "post",
            unbindRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementUnbindResponse");
    }

    public async pay(payRequest: AgreementPayRequest): Promise<AgreementPayResponse> {
        payRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(payRequest);
        payRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<AgreementQueryUserRequest, OACommonResponse>(
            this._pay,
            "post",
            payRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementPayResponse");
    }

    public async query(queryRequest: AgreementQueryRequest): Promise<AgreementQueryResponse> {
        queryRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(queryRequest);
        queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<AgreementQueryRequest, AgreementQueryResponse>(
            this._query,
            "post",
            queryRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementQueryResponse");
    }

    public async balance(balanceRequest: AgreementBalanceRequest): Promise<AgreementBalanceResponse> {
        balanceRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(balanceRequest);
        balanceRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<AgreementBalanceRequest, AgreementBalanceResponse>(
            this._balance,
            "post",
            balanceRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementBalanceResponse");
    }

    public async queryUser(queryUserRequest: AgreementQueryUserRequest): Promise<AgreementQueryUserResponse> {
        queryUserRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(queryUserRequest);
        queryUserRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<AgreementQueryUserRequest, AgreementQueryUserResponse>(
            this._query_user,
            "post",
            queryUserRequest,
        );
        return ObjectSerializer.deserialize(response, "AgreementQueryUserResponse");
    }

    private getDataToSign(request:
                              AgreementBindRequest
                              | AgreementUnbindRequest
                              | AgreementPayRequest
                              | AgreementQueryUserRequest
                              | AgreementBalanceRequest
                              | AgreementQueryRequest): string {
        const data = [];
        if (request instanceof AgreementBindRequest) {
            data.push(request.app_id);
            data.push(request.app_trans_id);
            data.push(request.binding_data);
            data.push(request.binding_type);
            data.push(request.identifier);
            data.push(request.max_amount);
            data.push(request.req_date);
        } else if (request instanceof AgreementUnbindRequest) {
            data.push(request.app_id);
            data.push(request.identifier);
            data.push(request.binding_id);
            data.push(request.req_date);
        } else if (request instanceof AgreementPayRequest) {
            data.push(request.app_id);
            data.push(request.identifier);
            data.push(request.zp_trans_token);
            data.push(request.pay_token);
            data.push(request.req_date);
        } else if (request instanceof AgreementQueryUserRequest) {
            data.push(request.app_id);
            data.push(request.access_token);
            data.push(request.req_date);
        } else if (request instanceof AgreementBalanceRequest) {
            data.push(request.app_id);
            data.push(request.pay_token);
            data.push(request.identifier);
            data.push(request.amount);
            data.push(request.req_date);
        } else { // AgreementQueryRequest
            data.push(request.app_id);
            data.push(request.app_trans_id);
            data.push(request.req_date);
        }
        return data.join(HmacUtils.DATA_SEPARATOR);
    }
}

export default Tokenization;