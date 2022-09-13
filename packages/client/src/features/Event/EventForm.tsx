import { SubmitHandler, useForm } from 'react-hook-form';
import { StyledInput } from '../../components/forms/StyledInput';
import { StyledLabel } from '../../components/forms/StyledLabel';
import { Header } from '../../components/Header';
import { ErrorMsg } from '../../components/forms/ErrorMsg';

import { zodResolver } from '@hookform/resolvers/zod';
import { Event } from '@eve/server/src/router/event';
import { EventSchema } from '../../types/event.schema';
import { useEffect, useState } from 'react';

type Props = {
  onSubmit: (data: Event) => void
}

export function EventForm({ onSubmit }: Props) {
  const [opacity, setOpacity] = useState(0);
  const { register, reset, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<Event>({
    resolver: zodResolver(EventSchema),
    criteriaMode: 'all'
  });

  const addEvent: SubmitHandler<Event> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset();
      showStatus();
    }
  },[isSubmitSuccessful]);

  const showStatus = () => {
    setOpacity(100);
    setTimeout(() => {
      setOpacity(0);
    }, 3000);
  };

  return (
    <div className="bg-background border-2 border-normal-cyan hover:border-bright-cyan">
      <Header title='Add New Event' />
      <form onSubmit={handleSubmit(addEvent)}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className='col-span-6 sm:col-span-5'>
                <StyledLabel htmlFor="title" text="Title"/>
                <StyledInput aria-label="title" type="text" {...register('title')} />
                {errors.title?.message && <ErrorMsg message={errors.title?.message} />}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <StyledLabel htmlFor="first-name" text='First Name' />
                <StyledInput aria-label="first-name" type="text" {...register('firstName')} />
                {errors.firstName?.message && <ErrorMsg message={errors.firstName?.message} />}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <StyledLabel htmlFor="last-name" text='Last Name' />
                <StyledInput aria-label="last-name" type="text" {...register('lastName')} />
                {errors.lastName?.message && <ErrorMsg message={errors.lastName?.message} />}
              </div>

              <div className='col-span-6 sm:col-span-5'>
                <StyledLabel htmlFor="email" text='Email' />
                <StyledInput aria-label="email" type="email" {...register('email')} />
                {errors.email?.message && <ErrorMsg message={errors.email?.message} />}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <StyledLabel htmlFor="event-date" text='Event Date' />
                <StyledInput aria-label="event-date" type="date" {...register('eventDate')} />
                {errors.eventDate?.message && <ErrorMsg message={errors.eventDate?.message} />}
              </div>

              <div className='col-span-6'>
                <StyledLabel htmlFor="details" text='Details' />
                <textarea
                  aria-label="details"
                  rows={3} 
                  className="block w-full rounded-md focus:border-bright-cyan focus:ring-bright-cyan sm:text-sm mt-1"
                  defaultValue={''}
                  {...register('details')}
                />
                {errors.details?.message && <ErrorMsg message={errors.details?.message} />}
              </div>
            </div>
          </div>
        </div>
        <div className="relative px-4 py-4 text-right sm:px-6">
          <div className='flex justify-center p-2'>
            {isSubmitting && <div className="loader"></div>}
            <div className='text-green-500 transition-opacity' style={{opacity: opacity}}>Saved</div>
          </div>
          <button
            type="submit"
            aria-label="save" 
            className="inline-flex justify-center rounded-md border border-transparent bg-normal-blue py-2 px-4 text-sm font-medium text-white hover:bg-bright-blue focus:outline-none focus:ring-2 focus:ring-bright-blue focus:ring-offset-2"
            disabled={isSubmitting}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}