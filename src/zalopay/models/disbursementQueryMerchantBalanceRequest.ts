/*
* The version of the ZaloPay OpenAPI document: v1.0.0
* Contact: developer@zalopay.vn
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit this class manually.
*/

export class DisbursementQueryMerchantBalanceRequest {
    /**
    * Client request identity, using for tracing request
    */
    'request_id'?: string;

    /**
    * The unique ID of the partner will be provided after the partner registered successfully with ZaloPay
    */
    'app_id'?: number;

    /**
    * The unique ID of the partner will be provided after the partner registered successfully with ZaloPay
    */
    'payment_id'?: string;

    /**
    * Requests timestamp in ms
    */
    'time': number;

    /**
    * It is a signature of the order. It’s calculated by following input: hmacInput = (app_id+ “|” + payment_id+ “|” + time) and use sha256 with app’s hmac key
    */
    'mac'?: string;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "request_id",
            "baseName": "request_id",
            "type": "string"
        },
        {
            "name": "app_id",
            "baseName": "app_id",
            "type": "number"
        },
        {
            "name": "payment_id",
            "baseName": "payment_id",
            "type": "string"
        },
        {
            "name": "time",
            "baseName": "time",
            "type": "number"
        },
        {
            "name": "mac",
            "baseName": "mac",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return DisbursementQueryMerchantBalanceRequest.attributeTypeMap;
    }
}
