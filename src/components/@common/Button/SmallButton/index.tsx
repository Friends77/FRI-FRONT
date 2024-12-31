import * as Styled from './SmallButton.styled';

export interface ISmallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SmallButton = ({ children, ...rest }: ISmallButtonProps) => {
  return <Styled.Button {...rest}>{children}</Styled.Button>;
};

export default SmallButton;
