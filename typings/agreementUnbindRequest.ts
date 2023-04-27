
export class AgreementQueryUserRequest {
    /**
    * The unique ID of the application will be provided after the merchant registered successfully with ZaloPay.
    */
    'app_id': number;
    /**
    * The user\'s identifier on the merchant system, it can be a merchant user\'s id, phone number, email...
    */
    'identifier': string;
    /**
    * The ID of binding that the user wants to unbind.
    */
    'binding_id': string;
    /**
    * The timestamp that order was created at in ms. The different limit is 15 minutes.
    */
    'req_date': number;
    /**
    * It is signature of request. It\'s calculated by following input: hmacinput = app_id + `|` + identifier + `|` + binding_id + `|` + req_date; and use sha256 with app\'s hmac key as sign key.
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
            "name": "identifier",
            "baseName": "identifier",
            "type": "string"
        },
        {
            "name": "binding_id",
            "baseName": "binding_id",
            "type": "string"
        },
        {
            "name": "req_date",
            "baseName": "req_date",
            "type": "number"
        },
        {
            "name": "mac",
            "baseName": "mac",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AgreementQueryUserRequest.attributeTypeMap;
    }
}

