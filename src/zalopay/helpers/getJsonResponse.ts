import Resource from "../services/resource";
import { Method } from "axios";
import { RequestOptions } from "../utils/requestUtils";

async function getJsonResponse<T, R>(
  resource: Resource,
  method: Method,
  jsonRequest: T | string,
  requestOptions: RequestOptions = {}
): Promise<R | string> {
  const request =
    typeof jsonRequest === "string" ? jsonRequest : JSON.stringify(jsonRequest);
  const response = await resource.request(method, request, requestOptions);
  try {
    const respJson =
      typeof response === "string" ? JSON.parse(response) : response;
    return respJson.data;
  } catch (e) {
    console.error("Error while get response data");
    throw e;
  }
}

export default getJsonResponse;
