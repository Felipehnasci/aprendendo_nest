import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { REQUEST_TOKEN_PAYLOAD_NAME } from "../common/auth.constant";

export const TokenPayloadParam = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const context = ctx.switchToHttp()
        const request : Request = context.getRequest();

        return request[REQUEST_TOKEN_PAYLOAD_NAME]
    }
)