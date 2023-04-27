
export class OAQueryRefundRequest {
    /**
    * The unique ID of the application will be provided after the merchant registered successfully with ZaloPay.
    */
    'app_id': number;
    /**
    * Refund ID that is used for requesting refund.
    */
    'm_refund_id': string;
    /**
    * Timestamp of request in ms.
    */
    'timestamp': number;
    /**
    * It is signature of order. It\'s calculated by following input: hmacinput = appid + `|` + mrefundid + `|` + timestamp and use sha256 with app\'s hmac key as sign key
    */
    'mac': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "app_id",
            "baseName": "app_id",
            "type": "number"
        },
        {
            "name": "m_refund_id",
            "baseName": "m_refund_id",
            "type": "string"
        },
        {
            "name": "timestamp",
            "baseName": "timestamp",
            "type": "number"
        },
        {
            "name": "mac",
            "baseName": "mac",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return OAQueryRefundRequest.attributeTypeMap;
    }
}

