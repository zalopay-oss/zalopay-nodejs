import { ZaloPayClient } from "../../src/zalopay";

describe('ZaloPayClient', () => {
  it('should create an instance of ZaloPayClient', () => {
    const client = new ZaloPayClient({
      appId: "app_id",
      key1: "key1",
      key2: "key2",
      env: 'sandbox',
    });
    expect(client).toBeDefined();
  });
});