import Service from "../service";
import {Method} from "axios";

abstract class Resource {
    protected endpoint: string;
    private service: Service;

    protected constructor(service: Service, endpoint: string) {
        this.service = service;
        this.endpoint = endpoint;
    }

    public request(method: Method, data: string): Promise<string> {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return this.service.httpClient.request<Method, string>({
            method,
            url: this.endpoint,
            data,
            headers,
        });
    }
}

export default Resource;