import Resource from "../services/resource";
import {Method} from "axios";

async function getJsonResponse<T, R>(
    resource: Resource,
    method: Method,
    jsonRequest: T | string,
): Promise<R | string> {
    const request = typeof jsonRequest === "string" ? jsonRequest : JSON.stringify(jsonRequest);
    const response = await resource.request(method, request);
    try {
        return typeof response === "string" ? JSON.parse(response) : response;
    } catch (e) {
        return response;
    }
}

export default getJsonResponse;