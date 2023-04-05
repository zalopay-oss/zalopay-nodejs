type AnyObject = {
  [key: string]: any;
};

export const camel = (str: string) => str.replace(/_+(.?)/g, (_, p1) => p1.toUpperCase());
export const snake = (str: string) =>
  str
    .replace(/(^[A-Z])/, (_, p1) => p1.toLowerCase())
    .replace(/([A-Z]+)/g, (_, p1) => `_${p1.toLowerCase()}`);

const detectObject = (obj: any) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return true;
  }
  return false;
};

const propertyNameConverter = (converterFn: (s: string) => string) => (data: AnyObject, ignorePropNames: string[] = []): object => {
  const recursive = (obj: AnyObject): AnyObject => {
    if (!detectObject(data)) {
      return data;
    }
    const keys = Object.keys(obj);
    return keys.reduce((accum: object, propName: string) => {
      const propValue = obj[propName];
      return {
        ...accum,
        [ignorePropNames.indexOf(propName) !== -1 ? propName : converterFn(propName)]: Array.isArray(propValue)
          ? propValue.map((x) => (detectObject(x) ? recursive(x) : x))
          : detectObject(propValue)
            ? recursive(propValue)
            : propValue,
      };
    }, {});
  };
  return recursive(data);
};

export const toSnake = propertyNameConverter(snake);
export const toCamel = propertyNameConverter(camel);