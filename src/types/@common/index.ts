import { FriendsStatus } from '../chat';
import { Gender } from '../user';

export interface Options {
  value: string | number;
  label: string | number;
}

export interface IPaginationParams {
  size?: number;
}

export interface IPaginationResponse {
  hasNext: boolean;
}

export interface IInterestTag {
  id: number;
  name: string;
  type: 'SUBJECT' | 'REGION';
  image: string | null;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export enum MBTI {
  INFP = 'INFP',
  ISFP = 'ISFP',
  INTP = 'INTP',
  ISTP = 'ISTP',
  ENFP = 'ENFP',
  ESFP = 'ESFP',
  ENTP = 'ENTP',
  ESTP = 'ESTP',
  INFJ = 'INFJ',
  ISFJ = 'ISFJ',
  INTJ = 'INTJ',
  ISTJ = 'ISTJ',
  ENFJ = 'ENFJ',
  ESFJ = 'ESFJ',
  ENTJ = 'ENTJ',
  ESTJ = 'ESTJ',
}

export interface MBTIType {
  EI: string;
  NS: string;
  FT: string;
  JP: string;
}

export interface IUserProfile {
  memberId: number;
  nickname: string;
  email: string;
  birth: string;
  gender: Gender;
  location: ILocation;
  selfDescription?: string;
  mbti: MBTI;
  interestTag: IInterestTag[];
  imageUrl: string;
}

export interface IPrivateRecommendUsers {
  content: {
    profileSimpleResponseDto: IUserProfile;
    type: FriendsStatus;
  }[];
}
