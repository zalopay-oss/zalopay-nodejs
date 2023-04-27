
export class OAQueryOrderRequest {
    /**
    * The unique ID of the application will be provided after the merchant registered successfully with ZaloPay.
    */
    'app_id': number;
    /**
    * The transaction ID that is used for querying.
    */
    'app_trans_id': string;
    /**
    * It is signature of order. It\'s calculated by following input: hmacinput = appid + `|` + apptransid and use sha256 with app\'s hmac key as sign key
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
            "name": "app_trans_id",
            "baseName": "app_trans_id",
            "type": "string"
        },
        {
            "name": "mac",
            "baseName": "mac",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return OAQueryOrderRequest.attributeTypeMap;
    }
}

