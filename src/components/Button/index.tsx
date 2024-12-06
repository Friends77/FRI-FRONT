interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  disable?: boolean;
}

export default function Button({ disable, text, ...props }: ButtonProps) {
  return (
    <button disabled={disable} {...props}>
      {text}
    </button>
  );
}
