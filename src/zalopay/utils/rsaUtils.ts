
import { Config } from "../utils/Config";
import NodeRSA from "node-rsa";

type Encoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "latin1" | "base64" | "hex" | "binary" | "buffer";

export type Scheme = "pkcs1" | "pkcs8";

export interface RSAOptions {
    /**
     * The encryption scheme
     */
    scheme: Scheme;
}

class RSAUtils {
    private rsa: NodeRSA;

    static fromConfig(config: Config, options: RSAOptions): RSAUtils {
        return new RSAUtils(config.privateKey ?? "", options.scheme);
    }

    private constructor(privateKey: string, scheme?: Scheme) {
        this.rsa = new NodeRSA(privateKey, scheme as NodeRSA.Format ?? "pkcs1");
    }

    /**
     * 
     * @param data The data to sign
     * @param encoding encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'
     * @param sourceEncoding source encoding, works only with string buffer. Can take standard Node.js Buffer encodings (hex, utf8, base64, etc). 'utf8' by default.
     * @returns signed data
     */
    public sign(data: string, encoding?: Encoding, sourceEncoding?: Encoding) {
        return this.rsa.sign(Buffer.from(data), encoding ?? "buffer", sourceEncoding ?? "utf8");
    }

    /**
     * 
     * @param sourceData The data for check
     * @param signature The signature for check
     * @param encoding encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'
     * @param sourceEncoding source encoding, works only with string buffer. Can take standard Node.js Buffer encodings (hex, utf8, base64, etc). 'utf8' by default.
     * @param signatureEncoding encoding of given signature. May be 'buffer', 'binary', 'hex' or 'base64'.
     * @returns True if signature is valid
     */
    public verify(sourceData: string, signature: string, sourceEncoding?: Encoding, signatureEncoding?: Encoding) {
        return this.rsa.verify(Buffer.from(sourceData), signature, sourceEncoding ?? "utf8", signatureEncoding ?? "buffer");
    }
}

export default RSAUtils;
