import { AUTH_PATTERN } from "@/constants/pattern";

export function validateEmpty(value: string) {
  return value.trim() !== "";
}

export function validateEmail(value: string) {
  return AUTH_PATTERN.EMAIL.test(value);
}

export function validatePassword(value: string) {
  /**
   * 글자 제한: 8~20
   * 알파벳 소문자, 숫자, 특수문자 각각 1개 이상 포함
   * 공백 금지
   */
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=\S{8,20}$).*/;
  return passwordRegex.test(value);
}

export function validateCertNo(value: string) {
  return value.trim().length === 6;
}
