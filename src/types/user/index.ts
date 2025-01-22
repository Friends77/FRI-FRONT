export interface Location {
  latitude: number;
  longitude: number;
}

export interface InterestTag {
  id: number;
  name: string;
  type: 'SUBJECT' | 'REGION';
  image: string;
}

export interface IProfileResponse {
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

export interface IProfileSimpleResponse {
  memberId: number;
  nickname: string;
  imageUrl: string;
  selfDescription: string;
}
