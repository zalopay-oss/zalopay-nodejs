"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateZODOrderRequest = exports.isCreateRefundOrderRequest = exports.isCreateQuickPayOrderRequest = exports.isCreateOrderRequest = void 0;
function isCreateOrderRequest(obj) {
    return 'type' in obj && obj.type === 'order';
}
exports.isCreateOrderRequest = isCreateOrderRequest;
function isCreateQuickPayOrderRequest(obj) {
    return 'type' in obj && obj.type === 'quick_pay';
}
exports.isCreateQuickPayOrderRequest = isCreateQuickPayOrderRequest;
function isCreateRefundOrderRequest(obj) {
    return 'type' in obj && obj.type === 'refund';
}
exports.isCreateRefundOrderRequest = isCreateRefundOrderRequest;
function isCreateZODOrderRequest(obj) {
    return 'type' in obj && obj.type === 'zod';
}
exports.isCreateZODOrderRequest = isCreateZODOrderRequest;
