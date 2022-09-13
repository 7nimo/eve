import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();