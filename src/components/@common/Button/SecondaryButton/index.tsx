import * as Styled from './SecondaryButton.styled';

export interface ISmallButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 너비 */
  width?: string;
  /** 버튼 타입 */
  type: 'submit' | 'reset' | 'button';
}

const SecondaryButton = ({
  children,
  width,
  type,
  ...rest
}: ISmallButtonProps) => {
  return (
    <Styled.Button $width={width} type={type} {...rest}>
      {children}
    </Styled.Button>
  );
};

export default SecondaryButton;
