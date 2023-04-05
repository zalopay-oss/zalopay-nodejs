"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProvider = void 0;
const Order_1 = require("./model/Order");
const CryptoJS = __importStar(require("crypto-js"));
const qs = __importStar(require("qs"));
const Order_2 = require("./mapper/Order");
const mapper_1 = require("./mapper/mapper");
class OrderProvider {
    constructor(client) {
        this.config = client.config;
        this.httpClient = client.httpClient;
    }
    create(order) {
        if ((0, Order_1.isCreateOrderRequest)(order)) {
            order.appId = order.appId || +this.config.appId;
            order.callbackUrl = order.callbackUrl || this.config.callbackUrl;
            order.appTime = order.appTime || Date.now();
            order.mac = order.mac || this.getCreateOrderMac(order);
            // Use function
            const request = (0, mapper_1.toSnake)(order);
            return this.httpClient
                .post("/v2/create", null, { params: request })
                .then((data) => (0, mapper_1.toCamel)(data.data));
        }
        else if ((0, Order_1.isCreateRefundOrderRequest)(order)) {
            return new Promise((resolve, _) => {
                const res = {};
                resolve(res);
            });
        }
        else if ((0, Order_1.isCreateZODOrderRequest)(order)) {
            return new Promise((resolve, _) => {
                const res = {};
                resolve(res);
            });
        }
        // add more logic for other types here
        else {
            return new Promise((resolve, _) => {
                const res = {
                    returnCode: 1,
                    returnMessage: "test",
                    subReturnCode: 1,
                    subReturnMessage: "test",
                    isProcessing: "123",
                    zpTransId: "123"
                };
                resolve(res);
            });
        }
    }
    query(order) {
        order.appId || (order.appId = +this.config.appId);
        order.mac || (order.mac = this.getQueryOrderMac(order));
        const request = (0, Order_2.toQueryOrderRequestJSON)(order);
        return this.httpClient
            .post("/v2/query", qs.stringify(request), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(data => (0, Order_2.toQueryOrderResponse)(data.data));
    }
    getCreateOrderMac(order) {
        const data = order.appId + "|" + order.appTransId + "|" + order.appUser + "|" + order.amount + "|" + order.appTime + "|" + order.embedData + "|" + order.item;
        return CryptoJS.HmacSHA256(data, this.config.key1).toString();
    }
    getQueryOrderMac(order) {
        const data = order.appId + "|" + order.appTransId + "|" + this.config.key1; // appid|app_trans_id|key1
        return CryptoJS.HmacSHA256(data, this.config.key1).toString();
    }
}
exports.OrderProvider = OrderProvider;
