import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Healthcheck")
@Controller()
export class LivenessController {
  @Get("liveness")
  async liveness() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
