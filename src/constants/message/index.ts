// 인증 관련 에러 메세지
export const AUTH_ERROR_MSG = Object.freeze({
  EMAIL_REQUIRED: "이메일을 입력해주세요.",
  EMAIL_PATTERN: "이메일 형식이 아닙니다.",
  PASSWORD_REQUIRED: "비밀번호를 입력해주세요.",
  INCORRECT_EMAIL_OR_PASSWORD:
    "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.",
  CERTNO_REQUIRED: "인증코드를 입력해주세요.",
  CERTNO_PATTERN: "인증코드가 일치하지 않습니다.",
  PASSWORD_PATTERN:
    "비밀번호는 공백을 제외하고 알파벳 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
  PASSWORD_PATTERN_MORE: "비밀번호는 8자 이상 입력해야 합니다.",
  PASSWORD_PATTERN_BELOW: "비밀번호는 20자 이하로 입력해야 합니다.",
  PASSWORD_NOT_MATCH: "비밀번호가 일치하지 않습니다.",
});
