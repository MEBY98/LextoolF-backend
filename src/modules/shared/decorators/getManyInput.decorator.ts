import { createParamDecorator } from '@nestjs/common';
import { DEFAULT_GET_MANY } from '../../base/interfaces/getManyInput';

export const ParamGetMany = createParamDecorator(
  (data, [root, args, ctx, info]) => args.getManyInput || DEFAULT_GET_MANY,
); 