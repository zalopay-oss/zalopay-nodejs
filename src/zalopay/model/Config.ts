export interface Config {
  appId: string;
  paymentId?: string;
  key1: string;
  key2: string;
  privateKey?: string;
  callbackUrl?: string;
  env: "sandbox" | "production";
}
