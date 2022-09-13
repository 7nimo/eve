type Props = {
  title: string;
}

export const Header = ({ title }: Props) => (
  <div className='bg-stone-900'>
    <h1 className='text-white text-lg font-bold px-6 py-1 text-center'>{title}</h1>
  </div>
);