import {ZaloPayClient} from "../../zaloPayClient";

export const createClient = (): ZaloPayClient => {
    return new ZaloPayClient({
        appId: "2554",
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        callbackUrl: "",
        env: "sandbox",
    });
};