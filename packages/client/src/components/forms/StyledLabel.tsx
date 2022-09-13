interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export const StyledLabel = ({text, ...props}: LabelProps) => {
  return (
    <label className="block text-sm font-medium font-bold text-bright-cyan" {...props}>
      {text}
    </label>
  )
};