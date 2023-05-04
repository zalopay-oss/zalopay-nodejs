
export class AgreementQueryUserResponse {
            /**
            * Return codes: 1: Success, 2: Failed, 3: Processing
            */
        'return_code'?: number;
        'return_message'?: string;
            /**
            * 
            */
        'sub_return_code'?: number;
        'sub_return_message'?: string;
            /**
            * \"Masked phone of user. For example: ****1234.\"
            */
        'phone'?: string;

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
            "name": "phone",
            "baseName": "phone",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AgreementQueryUserResponse.attributeTypeMap;
    }
}

