import { Event } from '@eve/server/src/router/event';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { EventForm } from '../features/Event/EventForm';
import { EventsList } from '../features/Event/EventsList';
import { EventSchema } from '../types/event.schema';
import { trpc } from '../utils/trpc';

export function Index() {
  const queryClient = useQueryClient();
  const events = trpc.useQuery(['event.all']);
  const [data, setData] = useState<Event[]>();

  const mutation = trpc.useMutation(['event.add']);

  const handleAddEvent = (data: Event) => {
    mutation.mutate(data, {
      onSuccess: async() => queryClient.invalidateQueries(['event.all']),
    });
  };

  useEffect(() => {
    if (events.data) {
      const parsedEvents = events.data.map((event) => EventSchema.parse(event));
      setData(parsedEvents);
    }
  },[events.data]);
  
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-3 lg:grid-cols-7 gap-4'>
        <div className="col-span-3 lg:col-start-3 lg:col-span-3">
          <EventForm onSubmit={handleAddEvent} />
          {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
        </div>
      </div>
      <div className="mt-8">
        {events.isLoading && <div className='loader'></div>}
        {data && <EventsList events={data} />} 
      </div>
    </div>
  )
}