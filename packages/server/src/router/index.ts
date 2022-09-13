import { createRouter } from './createRouter';
import { event } from './event';

export const appRouter = createRouter()
  .merge('event.', event);

export type AppRouter = typeof appRouter;