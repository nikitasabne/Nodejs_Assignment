import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectUserId = createParamDecorator(
  (field_name: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.body[field_name] = request.user._id;
    return request;
  },
);
