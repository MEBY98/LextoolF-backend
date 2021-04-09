import { createParamDecorator } from '@nestjs/common';

export const GetPaginationInput = createParamDecorator(
    (data, [root, args, ctx, info]) => args.paginationInput,
);