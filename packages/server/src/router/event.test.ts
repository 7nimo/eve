import { appRouter } from '.';
import { createContext } from './createRouter';
import { inferMutationInput } from '../utils/trpc';

test('add and get event', async () => {
  const ctx = createContext;
  const caller = appRouter.createCaller(ctx);

  const input: inferMutationInput<'event.add'> = {
    title: 'Test',
    email: 'test@email.com',
    firstName: 'Foo',
    lastName: 'Bar',
    eventDate: new Date(),
    details: 'Additional info'
  };

  const event = await caller.mutation('event.add', input);
  const byId = await caller.query('event.byId', {
    id: event.id
  });

  expect(byId).toMatchObject(input);
});
