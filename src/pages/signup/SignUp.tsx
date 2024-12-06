import { Link } from 'react-router';
import { SIGN_UP_PATH } from '@/constants/path';

export default function SignUpPage() {
  return (
    <div>
      <Link to={SIGN_UP_PATH.SIGN_UP_TO_EMAIL}>이메일로 회원가입하기</Link>
    </div>
  );
}
