
export class AgreementBalanceResponseDataInner {
            /**
            * Payment channel.
            */
        'channel'?: number;
            /**
            * If the user can pay on this channel.
            */
        'payable'?: boolean;
            /**
            * Bank code of the channel.
            */
        'bank_code'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "channel",
            "baseName": "channel",
            "type": "number"
        },
        {
            "name": "payable",
            "baseName": "payable",
            "type": "boolean"
        },
        {
            "name": "bank_code",
            "baseName": "bank_code",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AgreementBalanceResponseDataInner.attributeTypeMap;
    }
}

