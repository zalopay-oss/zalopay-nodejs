import { AgreementQueryResponseData } from './agreementQueryResponseData';

export class AgreementQueryResponse {
    /**
    * Return codes:  1 - SUCCESS  2 - FAILED  3 - PENDING
    */
    'return_code'?: number;
    'return_message'?: string;
    /**
    * 
    */
    'sub_return_code'?: number;
    'sub_return_message'?: string;
    'data'?: AgreementQueryResponseData;

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
            "type": "AgreementQueryResponseData"
        }    ];

    static getAttributeTypeMap() {
        return AgreementQueryResponse.attributeTypeMap;
    }
}

