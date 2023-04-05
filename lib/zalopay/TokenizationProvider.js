"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenizationProvider = void 0;
const mapper_1 = require("./mapper/mapper");
class TokenizationProvider {
    constructor(client) {
        this.config = client.config;
        this.httpClient = client.httpClient;
    }
    create(input) {
        const request = (0, mapper_1.toSnake)(input);
        return new Promise((resolve, _) => {
            const res = {
                returnCode: 1,
                returnMessage: "test",
                subReturnCode: 1,
                subReturnMessage: "test",
                data: {
                    appId: 1,
                    appTransId: "test",
                    bindingData: "test",
                    payToken: "test",
                    serverTime: 0,
                    merchantUserId: "test",
                    status: 0,
                    msgType: 0,
                    zpUserId: "",
                    maskedUserPhone: "test"
                },
            };
            resolve(res);
        });
    }
    getCreateOrderMac(order) {
        const data = order.appId + "|" + order.appTransId + "|" + order.bindingData + "|" + order.bindingType + "|" + order.identifier + "|" + order.maxAmount + "|" + order.reqDate;
        return CryptoJS.HmacSHA256(data, this.config.key1).toString();
    }
}
exports.TokenizationProvider = TokenizationProvider;
