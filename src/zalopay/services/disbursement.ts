import {ZaloPayClient} from "../zaloPayClient";
import Service from "../service";
import getJsonResponse from "../helpers/getJsonResponse";
import {
    DisbursementQueryMerchantBalanceRequest,
    DisbursementQueryMerchantBalanceResponse,
    DisbursementQueryOrderRequest,
    DisbursementQueryOrderResponse,
    DisbursementQueryUserRequest,
    DisbursementQueryUserResponse,
    DisbursementTopupRequest,
    DisbursementTopupResponse,
    ObjectSerializer
} from "../models/models";
import HmacUtils from "../utils/hmacUtils";
import DisbursementResource from "./resource/disbursementResource";
import RSAUtils from "../utils/rsaUtils";

class Disbursement extends Service {
    private readonly _query_merchant_balance: DisbursementResource;
    private readonly _query_user: DisbursementResource;

    private readonly _topup: DisbursementResource;
    private readonly _query_order: DisbursementResource;

    private hmacUtils: HmacUtils;
    private readonly rsaUtils: RSAUtils;

    public constructor(client: ZaloPayClient) {
        super(client);
        this._query_merchant_balance = new DisbursementResource(this, "/v2/disbursement/balance");
        this._query_user = new DisbursementResource(this, "/v2/disbursement/user");
        this._topup = new DisbursementResource(this, "/v2/disbursement/topup");
        this._query_order = new DisbursementResource(this, "/v2/disbursement/txn");

        this.hmacUtils = new HmacUtils();
        this.rsaUtils = RSAUtils.fromConfig(client.config, {scheme: "pkcs8"});
    }

    public async queryMerchantBalance(balanceRequest: DisbursementQueryMerchantBalanceRequest): Promise<DisbursementQueryMerchantBalanceResponse> {
        balanceRequest.app_id = parseInt(this.config.appId);
        balanceRequest.payment_id =  balanceRequest.payment_id ?? this.config.paymentId;
        const dataSign: string = this.getDataToSign(balanceRequest);
        balanceRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<DisbursementQueryMerchantBalanceRequest, DisbursementQueryMerchantBalanceResponse>(
            this._query_merchant_balance,
            "post",
            balanceRequest,
        );
        return ObjectSerializer.deserialize(response, "DisbursementQueryMerchantBalanceResponse");
    }


    public async queryUser(queryUserRequest: DisbursementQueryUserRequest): Promise<DisbursementQueryUserResponse> {
        queryUserRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(queryUserRequest);
        queryUserRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<DisbursementQueryUserRequest, DisbursementQueryUserResponse>(
            this._query_user,
            "post",
            queryUserRequest,
        );
        return ObjectSerializer.deserialize(response, "DisbursementQueryUserResponse");
    }

    public async topup(payRequest: DisbursementTopupRequest): Promise<DisbursementTopupResponse> {
        payRequest.app_id ||= +this.config.appId;
        payRequest.payment_id =  payRequest.payment_id ?? this.config.paymentId;
        const dataSign: string = this.getDataToSign(payRequest);
        const mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        payRequest.sig = this.rsaUtils.sign(mac, 'base64', 'utf8');
        const response = await getJsonResponse<DisbursementTopupRequest, DisbursementTopupResponse>(
            this._topup,
            "post",
            payRequest,
        );
        return ObjectSerializer.deserialize(response, "DisbursementTopupResponse");
    }

    public async queryOrder(queryRequest: DisbursementQueryOrderRequest): Promise<DisbursementQueryOrderResponse> {
        queryRequest.app_id ||= +this.config.appId;
        const dataSign: string = this.getDataToSign(queryRequest);
        queryRequest.mac = this.hmacUtils.calculateHmac(dataSign, this.config.key1);
        const response = await getJsonResponse<DisbursementQueryOrderRequest, DisbursementQueryOrderResponse>(
            this._query_order,
            "post",
            queryRequest,
        );
        return ObjectSerializer.deserialize(response, "DisbursementQueryOrderResponse");
    }

    private getDataToSign(request:
                                DisbursementQueryMerchantBalanceRequest
                              | DisbursementQueryUserRequest
                              | DisbursementTopupRequest
                              | DisbursementQueryOrderRequest): string {
        const data = [];
        if (request instanceof DisbursementQueryMerchantBalanceRequest) {
            data.push(request.app_id);
            data.push(request.payment_id);
            data.push(request.time);
        } else if (request instanceof DisbursementQueryUserRequest) {
            data.push(request.app_id);
            data.push(request.phone);
            data.push(request.time);
        } else if (request instanceof DisbursementTopupRequest) {
            data.push(request.app_id);
            data.push(request.payment_id);
            data.push(request.partner_order_id);
            data.push(request.m_u_id);
            data.push(request.amount);
            data.push(request.description);
            data.push(request.partner_embed_data);
            data.push(request.extra_info);
            data.push(request.time);
        } else if (request instanceof DisbursementQueryOrderRequest) {
            data.push(request.app_id);
            data.push(request.partner_order_id);
            data.push(request.time);
        }
        return data.join("|");
    }
}

export default Disbursement;