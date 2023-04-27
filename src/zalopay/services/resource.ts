import Service from "../service";

abstract class Resource {
    protected endpoint: string;
    private service: Service;

    protected constructor(service: Service, endpoint: string) {
        this.service = service;
        this.endpoint = endpoint;
    }

    public request(json: string): Promise<string> {
        return this.service.httpClient.post(this.endpoint, json)
            .then((response) => response.data);
    }
}

export default Resource;