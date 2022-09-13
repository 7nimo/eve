# What is it?

Node Backend for adding and listing events. It consists of:

- [Express.js](https://expressjs.com/)
- [tRPC](https://trpc.io)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)

## Getting Started
Prerequisite:

- SQLite
- node 16.17.0
- pnpm

## Running locally

1. `pnpm install`
1. Initialize database client - `npx prisma generate`
1. Build typescript - `pnpm build-ts`
1. Run dev server - `pnpm watch`


## Running tests

```
pnpm jest
```