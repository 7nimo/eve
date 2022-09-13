import { forwardRef, Ref } from 'react'

export const StyledInput = forwardRef(({...props}: React.InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {
  return (
    <input ref={ref}
      className='block w-full rounded-md focus:border-bright-cyan focus:ring-bright-cyan sm:text-sm text-foreground'
      {...props}
    />
  )
});