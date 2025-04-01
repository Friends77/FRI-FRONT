export const AUTH_ERROR_MESSAGE = Object.freeze({
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_PATTERN: '이메일 형식이 아닙니다.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_PATTERN:
    '비밀번호는 공백을 제외하고 알파벳 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.',
  PASSWORD_PATTERN_MORE: '비밀번호는 8자 이상 입력해야 합니다.',
  PASSWORD_PATTERN_BELOW: '비밀번호는 20자 이하로 입력해야 합니다.',
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  INCORRECT_EMAIL_OR_PASSWORD:
    '아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.',
  CERTNO_REQUIRED: '인증코드를 입력해주세요.',
  CERTNO_PATTERN: '인증코드가 일치하지 않습니다.',
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_PATTERN: '2~20자의 한글, 영문, 숫자만 사용 가능합니다.',
  SELF_DESCRIPTION_REQUIRED: '한 줄 소개를 입력해주세요.',
  GENDER_REQUIRED: '성별을 선택해주세요.',
});

export const ALERT_MESSAGE = Object.freeze({
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패하였습니다.',
  MAX_IMAGE_LIMIT_EXCEEDED: '이미지는 최대 20장까지 업로드 가능합니다',
  LOGIN_REQUIRED: '로그인 후 이용 가능합니다.',
  FRIEND_REQUEST_SENT: '친구 신청을 보냈어요.',
  PASSWORD_CHANGED: '비밀번호가 변경되었습니다.',
  EMAIL_SENT: '메일을 보냈어요! 메일함을 확인해주세요.',
  EMAIL_SEND_FAILED: '이메일 발송에 실패했어요.',
  PLEASE_RELOGIN: '다시 로그인해 주세요.',
  ACCOUNT_ALREADY_REGISTERED:
    '해당 계정은 다른 소셜 서비스에 가입되어 있습니다.',
  CHAT_INVITE_FAILED: '채팅방 초대 수락을 실패했습니다.',
  CHAT_CREATION_FAILED: '채팅방 생성을 실패했습니다.',
  CHAT_ENTRY_FAILED: '채팅방 입장에 실패했습니다.',
  CHAT_EXIT_FAILED: '채팅방 나가기를 실패했습니다.',
  MESSAGE_FETCH_FAILED: '메세지를 가져오는데 실패했습니다.',
  CHAT_INVITE_REJECT_FAILED: '채팅방 초대 거절을 실패했습니다.',
  FRIEND_INVITE_FAILED: '친구초대를 실패했습니다.',
  FRIEND_REQUEST_ACCEPT_FAILED: '친구요청 수락을 실패했습니다.',
  FRIEND_REQUEST_FAILED: '친구요청을 실패했습니다.',
  FRIEND_REQUEST_REJECT_FAILED: '친구요청 거절을 실패했습니다.',
  SIGNUP_SUCCESS: '회원가입에 성공했어요.',
  SIGNUP_FAILED: '회원가입에 실패했어요.',
  NICKNAME_CHANGED: '닉네임이 변경되었습니다. 저장을 완료해주세요.',
  CHANGES_SAVED: '변경 되었습니다.',
});

export const CHAT_ERROR_MSG = Object.freeze({
  TITLE_REQUIRED: '채팅방 이름을 입력해주세요.',
  DESCRIPTION_REQUIRED: '채팅방 소개를 입력해주세요.',
});
