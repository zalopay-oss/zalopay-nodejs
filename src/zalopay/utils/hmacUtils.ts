import * as CryptoJS from "crypto-js";

class HmacUtils {
    public static DATA_SEPARATOR = "|";

    public calculateHmac(data: string, key: string) {
        return CryptoJS.HmacSHA256(data, key).toString();
    }
}

export default HmacUtils;
