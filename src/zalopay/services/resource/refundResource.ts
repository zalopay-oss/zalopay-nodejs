import Resource from "../resource";
import Service from "../../service";

class RefundResource extends Resource {
  public constructor(service: Service, endpoint: string) {
    super(
      service,
      endpoint
    );
  }
}

export default RefundResource;