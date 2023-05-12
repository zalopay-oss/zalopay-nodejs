/*
* The version of the ZaloPay OpenAPI document: v1.0.0
* Contact: developer@zalopay.vn
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit this class manually.
*/
import { DisbursementQueryOrderResponseData } from './disbursementQueryOrderResponseData';

export class DisbursementQueryOrderResponse {
    /**
    * 1 - SUCCESS  2 - FAIL
    */
    'return_code'?: number;

    /**
    * Return code description
    */
    'return_message'?: string;

    /**
    * -101 - Order not found  -401 - Request param illegal  -402 - Unauthorized  -500 - ZaloPay system error  -503 - The system is maintenance
    */
    'sub_return_code'?: number;

    /**
    * Sub return code description
    */
    'sub_return_message'?: string;

    'data'?: DisbursementQueryOrderResponseData;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "return_code",
            "baseName": "return_code",
            "type": "number"
        },
        {
            "name": "return_message",
            "baseName": "return_message",
            "type": "string"
        },
        {
            "name": "sub_return_code",
            "baseName": "sub_return_code",
            "type": "number"
        },
        {
            "name": "sub_return_message",
            "baseName": "sub_return_message",
            "type": "string"
        },
        {
            "name": "data",
            "baseName": "data",
            "type": "DisbursementQueryOrderResponseData"
        }    ];

    static getAttributeTypeMap() {
        return DisbursementQueryOrderResponse.attributeTypeMap;
    }
}
