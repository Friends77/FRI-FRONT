import PrimaryButton from '../@common/Button/PrimaryButton';
import Logo from '../@common/SVG/Icon/Logo';
import * as Styled from './ErrorFallback.styled';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <Styled.ErrorFallbackContainer>
      <Styled.GoHomeButton to="/">
        <Logo title="홈으로 돌아가기" width="48" height="48" />
      </Styled.GoHomeButton>
      <Styled.Title>문제가 발생했습니다.</Styled.Title>
      <Styled.Reason>사유: {error.message}</Styled.Reason>
      <Styled.Description>
        에러 발생 사유를 함께 아래 이메일로 전달해주시면
        <br />
        빠른 조치를 취하도록 하겠습니다.
      </Styled.Description>
      <Styled.SendEmail href="mailto:iamkjw77@naver.com">
        iamkjw77@naver.com
      </Styled.SendEmail>
      <PrimaryButton type="button" width="100px" onClick={resetErrorBoundary}>
        다시 시도
      </PrimaryButton>
    </Styled.ErrorFallbackContainer>
  );
};

export default ErrorFallback;
