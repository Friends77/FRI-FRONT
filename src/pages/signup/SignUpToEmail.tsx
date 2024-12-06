import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import React, { useState } from 'react';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
};

export default function SignUpToEmail() {
  const [isCertNoSended, setIsCertNoSended] = useState(false);

  // 사용자 이메일로 인증번호 발송
  const handleSendBtnClick = async () => {
    setIsCertNoSended(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/send-verification-code',
        {},
        {},
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 백엔드로 인증번호 발송
  const handleConfirmBtnClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/verify-email',
        {},
        {},
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form style={style} onSubmit={handleSubmit}>
        <div style={{ ...style, flexDirection: 'row' }}>
          <Input label="이메일" type="email" id="email" name="email" required />
          <Button
            type="button"
            text="인증번호 발송"
            onClick={handleSendBtnClick}
          />
        </div>
        {isCertNoSended && (
          <div style={{ ...style, flexDirection: 'row' }}>
            <Input
              label="인증번호"
              type="number"
              id="certno"
              name="certno"
              required
            />
            <Button
              type="button"
              text="인증번호 확인"
              onClick={handleConfirmBtnClick}
            />
          </div>
        )}
        <div>
          <Input
            label="비밀번호"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button>회원가입</button>
      </form>
    </div>
  );
}
