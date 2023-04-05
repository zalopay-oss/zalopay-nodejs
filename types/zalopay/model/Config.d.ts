export interface Config {
    appId: string;
    key1: string;
    key2: string;
    callbackUrl?: string;
    env: 'sandbox' | 'production';
}
