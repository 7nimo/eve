type Props = {
  message: string;
}

export const ErrorMsg = ({ message } : Props) => (
  <p role='alert' className='absolute bg-stone-700 text-sm text-red-500 mt-0.5'>
    ■ Error: {message}
  </p>
);
