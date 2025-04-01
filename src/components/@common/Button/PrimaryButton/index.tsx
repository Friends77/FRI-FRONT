import * as Styled from './PrimaryButton.styled';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 너비 */
  width?: string;
  /** 버튼 타입 */
  type: 'submit' | 'reset' | 'button';
}

const PrimaryButton = ({ children, width, type, ...rest }: IButtonProps) => {
  return (
    <Styled.Button type={type} $width={width} {...rest}>
      {children}
    </Styled.Button>
  );
};

export default PrimaryButton;
