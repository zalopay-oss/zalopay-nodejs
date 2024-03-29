/*
* The version of the ZaloPay OpenAPI document: v1.0.0
* Contact: developer@zalopay.vn
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit this class manually.
*/

export class GatewayBankItem {
  /**
  * Bank code
  */
  "bankcode"?: string;

  /**
  * Bank name
  */
  "name"?: string;

  /**
  * Display order
  */
  "displayorder"?: number;

  "pcmid"?: number;

  /**
  * Minimum payment amount
  */
  "minamount"?: number;

  /**
  * Maximum payment amount
  */
  "maxamount"?: number;


  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    {
      "name": "bankcode",
      "baseName": "bankcode",
      "type": "string"
    },
    {
      "name": "name",
      "baseName": "name",
      "type": "string"
    },
    {
      "name": "displayorder",
      "baseName": "displayorder",
      "type": "number"
    },
    {
      "name": "pcmid",
      "baseName": "pcmid",
      "type": "number"
    },
    {
      "name": "minamount",
      "baseName": "minamount",
      "type": "number"
    },
    {
      "name": "maxamount",
      "baseName": "maxamount",
      "type": "number"
    }  ];

  static getAttributeTypeMap() {
    return GatewayBankItem.attributeTypeMap;
  }
}

