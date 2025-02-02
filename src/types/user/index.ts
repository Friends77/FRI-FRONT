import { Options } from '../@common';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface InterestTag {
  id: number;
  name: 'string';
  type: 'SUBJECT' | 'REGION';
  image: 'string';
}

export interface IProfileResponse {
  memberId: number;
  nickname: string;
  email: string;
  birth: string;
  gender: 'MAN' | 'WOMAN' | 'ETC';
  location: Location;
  selfDescription: string;
  mbti:
    | 'INFP'
    | 'ISFP'
    | 'INTP'
    | 'ISTP'
    | 'ENFP'
    | 'ESFP'
    | 'ENTP'
    | 'ESTP'
    | 'INFJ'
    | 'ISFJ'
    | 'INTJ'
    | 'ISTJ'
    | 'ENFJ'
    | 'ESFJ'
    | 'ENTJ'
    | 'ESTJ';
  interestTag: InterestTag[];
  imageUrl: string;
}

// 실제 서버 전송 데이터 타입
export interface UpdateProfileFormDataType {
  imageUrl: string;
  selfDescription: string;
  gender: 'MAN' | 'WOMAN' | 'ETC';
  mbti?: string;
  interestTag?: (string | number)[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

// 폼 입력 데이터 타입
export interface UpdateProfileDataType extends UpdateProfileFormDataType {
  year: number;
  month: number;
  day: string;
  EI: string;
  NS: string;
  FT: string;
  JP: string;
  tags: Options[];
}

export type Profile = IProfileResponse;
