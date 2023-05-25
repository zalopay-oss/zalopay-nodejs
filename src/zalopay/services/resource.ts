import Service from "../service";
import { Method } from "axios";
import { RequestOptions } from "../utils/requestUtils";

abstract class Resource {
  protected endpoint: string;
  private service: Service;

  protected constructor(service: Service, endpoint: string) {
    this.service = service;
    this.endpoint = endpoint;
  }

  public request(
    method: Method,
    data: string,
    requestOptions?: RequestOptions
  ): Promise<string> {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    return this.service.httpClient.request<Method, string>({
      method,
      url: this.endpoint,
      data,
      headers,
      params: requestOptions?.params
    });
  }
}

export default Resource;
