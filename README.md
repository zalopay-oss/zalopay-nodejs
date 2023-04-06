# ZaloPay Node.js SDK

The Zalopay Node SDK provides convenient access to the ZaloPay API from applications written in server-side JavaScript or TypeScript.

## Installation

We have published our package on both GitHub Packages and npm registry

Install from npm registry by default, run:

```bash
npm i @zalopay-oss/zalopay-nodejs
```

Or install from Github Packages

1. Configure to download the package individually from GitHub Packages (if your default registry is not GitHub packages)

```bash
npm login --scope=@zalopay-oss --auth-type=legacy --registry=https://npm.pkg.github.com
```

Note: Password is your GitHub personal access token. Read this for more information: [Link](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)

2. Install the package

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
  amount: "amount",
  description: "description",
  bankCode: "zalopayapp",
  type: 'CreateOrderRequest',
};


client.orderProvider.create(order)
  .then(result => {
    console.log(result)
    ...
  })
  .catch(err => console.log(err));
```

## Note

Some cases you want to download the package from Github Packages, not from the npm registry and containerize your project or something similar. You must remember to config the npm to find the package in GitHub packages. Here is the example with the Dockerfile:

```Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN  echo "@zalopay-oss:registry=https://npm.pkg.github.com" >> .npmrc
RUN  echo "//npm.pkg.github.com/:_authToken=&{your_github_personal_access_token}" >> .npmrc
RUN  npm install
```

Read this for more information: [Link](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)
