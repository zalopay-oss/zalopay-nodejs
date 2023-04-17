# ZaloPay Node.js SDK

The Zalopay Node SDK provides convenient access to the ZaloPay API from applications written in server-side JavaScript or TypeScript.

## Installation

Run:

```bash
npm i @zalopay-oss/zalopay-nodejs
```

## Quick Start

1. Create a client with some initial configuration

```ts
import { ZaloPayClient } from "@zalopay-oss/zalopay-nodejs";

const client = new ZaloPayClient({
  appId: "your_app_id",
  key1: "your_key_1",
  key2: "your_key_2",
  callbackUrl: "your_default_callback_url",
  env: "sandbox",
});
```

2. Create a simple order through the client and handle the result

```ts
const order: CreateOrderRequest = {
  appTransId: "your_app_trans_id",
  appUser: "user_id",
  item: JSON.stringify(items),
  embedData: JSON.stringify(embed_data),
  amount: 1000,
  description: "description",
  bankCode: "zalopayapp",
  type: 'order',
};


client.orderProvider.create(order)
  .then(result => {
    console.log(result)
    ...
  })
  .catch(err => console.log(err));
```
