import * as Styled from './SecondaryButton.styled';

export interface ISmallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SecondaryButton = ({ children, ...rest }: ISmallButtonProps) => {
  return <Styled.Button {...rest}>{children}</Styled.Button>;
};

export default SecondaryButton;
