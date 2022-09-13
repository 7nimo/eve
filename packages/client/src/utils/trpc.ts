import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@eve/server/src/router';

export const trpc = createReactQueryHooks<AppRouter>();