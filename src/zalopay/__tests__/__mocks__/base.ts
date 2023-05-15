import {ZaloPayClient} from "../../zaloPayClient";

export const createClient = (): ZaloPayClient => {
    return new ZaloPayClient({
        appId: "2554",
        paymentId: "2554",
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        privateKey: "MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAuhr9fssauZOaef4HCEJ4OAJQ6g8y\
        O8de5KwB1LM/fIlRZGsnD0VO+YBGrdttnKsieErQPujmyV7Tnw19yLVGGwIDAQABAkEAgpPzbyZU\
        rwbIqXW6O2pf7XR6j29wII9nnmytsC7AicCd2uGAd+yHKEOQGEHBN+rm/IZ8F5WWT2OpnOTY3DZT\
        gQIhAPyzS24ahh0ogYuDy4VXsiLscEAngrAvZA5qpWWPFV9BAiEAvIkWcJzM9kaJ2YjoNcGvO3yd\
        DsepNeC79dfIA7tL6lsCIELaRChayARKxQrd0SfzrWLj3kZ6rW5i+zt9J0iY8/SBAiEAsw53c2hX\
        +KWxkhpGf5d9dz+4YisZ94OCv8+5tGGTjfUCIEs9pi1DsVZBi0HNibXIpVBO4KERvHBJ92bAbPep\
        lIb2",
        callbackUrl: "",
        env: "sandbox",
    });
};