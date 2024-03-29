/*
* The version of the ZaloPay OpenAPI document: v1.0.0
* Contact: developer@zalopay.vn
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit this class manually.
*/

export class ZodQueryStatusResponse {
  /**
  * Order\'s status: 1: SUCCESS - 2: FAILURE - 3: UNPAID
  */
  "status"?: number;

  /**
  * Order\'s amount
  */
  "amount"?: string;

  /**
  * ZaloPay transaction\'s ID
  */
  "zpTransId"?: string;


  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    {
      "name": "status",
      "baseName": "status",
      "type": "number"
    },
    {
      "name": "amount",
      "baseName": "amount",
      "type": "string"
    },
    {
      "name": "zpTransId",
      "baseName": "zpTransId",
      "type": "string"
    }  ];

  static getAttributeTypeMap() {
    return ZodQueryStatusResponse.attributeTypeMap;
  }
}

