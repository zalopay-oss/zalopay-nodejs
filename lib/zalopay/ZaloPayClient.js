"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaloPayClient = void 0;
const axios_1 = __importDefault(require("axios"));
const OrderProvider_1 = require("./OrderProvider");
const SecurityProvider_1 = require("./SecurityProvider");
class ZaloPayClient {
    constructor(config) {
        this.config = config;
        this.httpClient = axios_1.default.create({
            baseURL: config.env == 'sandbox' ? 'https://sb-openapi.zalopay.vn' : 'https://openapi.zalopay.vn',
        });
        this.orderProvider = new OrderProvider_1.OrderProvider(this);
        this.securityProvider = new SecurityProvider_1.SecurityProvider(this);
    }
}
exports.ZaloPayClient = ZaloPayClient;
