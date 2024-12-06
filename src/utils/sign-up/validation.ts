export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) || '이메일 형식이 잘못되었습니다.';
}

export function validatePassword(password: string) {
  /**
   * 글자 제한: 8~20
   * 알파벳 소문자, 숫자, 특수문자 각각 1개 이상 포함
   * 공백 금지
   */
  if (password.trim().length < 8 || password.trim().length > 20) {
    return '비밀번호는 8자 이상 20자 이하이어야 합니다.';
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=\S{8,20}$).*/;
  return passwordRegex.test(password) || '비밀번호 형식이 올바르지 않습니다.';
}
