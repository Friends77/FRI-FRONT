import * as Styled from './SecondaryButton.styled';

export interface ISmallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 너비 */
  width?: string;
}

const SecondaryButton = ({ children, width, ...rest }: ISmallButtonProps) => {
  return (
    <Styled.Button $width={width} {...rest}>
      {children}
    </Styled.Button>
  );
};

export default SecondaryButton;
