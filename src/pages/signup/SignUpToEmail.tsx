import Input from '@/components/Input';
import {
  validateCertNo,
  validateEmail,
  validatePassword,
} from '@/utils/sign-up/validation';
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
        <Input
          label="이메일"
          type="email"
          id="email"
          name="email"
          validate={validateEmail}
          buttonText="인증번호 발송"
          buttonClick={handleSendBtnClick}
          required
        />
        {isCertNoSended && (
          <Input
            label="인증번호"
            type="text"
            id="certno"
            name="certno"
            validate={validateCertNo}
            buttonText="인증하기"
            buttonClick={handleConfirmBtnClick}
            maxLength={6}
            required
          />
        )}
        <Input
          label="비밀번호"
          type="password"
          id="password"
          name="password"
          validate={validatePassword}
          descrption="비밀번호는 8~20자 길이로 만들어주세요! 알파벳 소문자, 숫자, 특수문자를 각각 하나 이상 꼭 포함해야 해요 😊"
          required
          minLength={8}
          maxLength={20}
        />
        <button>회원가입</button>
      </form>
    </div>
  );
}
