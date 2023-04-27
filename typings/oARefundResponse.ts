
export class OARefundResponse {
    'return_code'?: number;
    'return_message'?: string;
    'sub_return_code'?: number;
    'sub_return_message'?: string;
    'refund_id'?: number;

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
            "name": "refund_id",
            "baseName": "refund_id",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return OARefundResponse.attributeTypeMap;
    }
}

