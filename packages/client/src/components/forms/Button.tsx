export const Button = ({...props}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className='block w-full rounded-md focus:border-bright-cyan focus:ring-bright-cyan sm:text-sm mt-1 text-foreground'/>
  )
};