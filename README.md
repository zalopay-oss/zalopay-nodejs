# ZaloPay Node.js SDK

The ZaloPay Node SDK provides convenient access to the ZaloPay API from applications written in server-side JavaScript
or TypeScript.

## Installation

Run:

```bash
npm i @zalopay-oss/zalopay-nodejs
```

## Usage

```javascript
// Step 1: Import the parts of the module you want to use
import {
  ZaloPayClient,
  TokenizationAPI,
  AgreementBindRequest,
  AgreementBindResponse
} from "@zalopay-oss/zalopay-nodejs";

// Step 2: Initialize the ZaloPay client object with your merchant information
const client = new ZaloPayClient({
  appId: "your_app_id",
  key1: "your_key_1",
  key2: "your_key_2",
  callbackUrl: "your_default_callback_url",
  env: "sandbox"
});

// Step 3: Initialize the API object, eg: Tokenization API
const tokenizationAPI: TokenizationAPI = new TokenizationAPI(client);

// Step 4: Create the request object
const request: AgreementBindRequest = {
  app_id: 0,
  app_trans_id: "",
  binding_type: BindingTypeEnum.Wallet,
  callback_url: "",
  identifier: "",
  mac: "",
  max_amount: 0,
  redirect_deep_link: "",
  redirect_url: "",
  req_date: 0,
  binding_data: ""
};

// Step 5: Make the request
tokenizationAPI
  .bind(request)
  .then(bindResponse => console.log(bindResponse))
  .catch(error => console.log(error));
```

### Step 1: Import the parts of the module you want to use

Use the Node.js `require` function to load the `ZaloPayClient` and API objects. For the name of the API objects, see [API Explorer](https://beta-docs.zalopay.vn/docs/specs/swagger-zalopay-openapi).

For example, to use the [Tokenization API](https://beta-docs.zalopay.vn/docs/specs/tokenization):

```javascript
import { ZaloPayClient, TokenizationAPI } from "@zalopay-oss/zalopay-nodejs";
```

### Step 2: Initialize the client object

Initialize the client object, passing the following:

- `appId`, `key1`, `key2`: The merchant keys you [registered from the Merchant Portal](https://mc.zalopay.vn/mso-v3/register)
- `callbackUrl`: The url that you want ZaloPay return after processing some APIs.
- `env`: For the test environment, use **sanbox**. For the live environment, use **production**.

For example:

```javascript
const client = new ZaloPayClient({
  appId: "your_app_id",
  key1: "your_key_1",
  key2: "your_key_2",
  callbackUrl: "your_default_callback_url",
  env: "sandbox"
});
```

### Step 3: Initialize the API object

Initialize the API object you want to use, passing the `client` object from the previous step.

For example, to use the [Tokenization API](https://beta-docs.zalopay.vn/docs/specs/tokenization):

```javascript
const tokenizationAPI: TokenizationAPI = new TokenizationAPI(client);
```

### Step 4: Create the request object

Create the request object. For example, for a request to the `/v2/agreement/bind` endpoint:

```javascript
const request: AgreementBindRequest = {
  app_id: 0,
  app_trans_id: "",
  binding_type: BindingTypeEnum.Wallet,
  callback_url: "",
  identifier: "",
  mac: "",
  max_amount: 0,
  redirect_deep_link: "",
  redirect_url: "",
  req_date: 0,
  binding_data: ""
};
```

### Step 5: Make the request

Use the API object's method to make the request. For example, to make a request to the `/v2/agreement/bind` endpoint using the `TokenizationAPI` object:

```javascript
tokenizationAPI
  .bind(request)
  .then(bindResponse => console.log(bindResponse))
  .catch(error => console.log(error));
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
