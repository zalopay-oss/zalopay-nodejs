"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamel = exports.toSnake = exports.snake = exports.camel = void 0;
const camel = (str) => str.replace(/_+(.?)/g, (_, p1) => p1.toUpperCase());
exports.camel = camel;
const snake = (str) => str
    .replace(/(^[A-Z])/, (_, p1) => p1.toLowerCase())
    .replace(/([A-Z]+)/g, (_, p1) => `_${p1.toLowerCase()}`);
exports.snake = snake;
const detectObject = (obj) => {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return true;
    }
    return false;
};
const propertyNameConverter = (converterFn) => (data, ignorePropNames = []) => {
    const recursive = (obj) => {
        if (!detectObject(data)) {
            return data;
        }
        const keys = Object.keys(obj);
        return keys.reduce((accum, propName) => {
            const propValue = obj[propName];
            return Object.assign(Object.assign({}, accum), { [ignorePropNames.indexOf(propName) !== -1 ? propName : converterFn(propName)]: Array.isArray(propValue)
                    ? propValue.map((x) => (detectObject(x) ? recursive(x) : x))
                    : detectObject(propValue)
                        ? recursive(propValue)
                        : propValue });
        }, {});
    };
    return recursive(data);
};
exports.toSnake = propertyNameConverter(exports.snake);
exports.toCamel = propertyNameConverter(exports.camel);
