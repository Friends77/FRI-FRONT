import {
  IInterestTag,
  ILocation,
  IPaginationParams,
  IPaginationResponse,
  MBTI,
} from '../@common';

export enum Gender {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

export interface IProfileResponse {
  memberId: number;
  nickname: string;
  email: string;
  birth: string;
  gender: Gender;
  location: Location;
  selfDescription: string;
  mbti: MBTI;
  interestTag: IInterestTag[];
  imageUrl: string;
}

export interface IUpdateProfileForm {
  imageUrl: string;
  nickname: string;
  selfDescription?: string;
  year: string;
  month: string;
  day: string;
  gender: Gender;
  EI: string;
  NS: string;
  FT: string;
  JP: string;
  tags?: {
    value: number;
    label: string;
  }[];
}

export interface IUpdateProfileFormRequest {
  imageUrl: string;
  selfDescription?: string;
  gender: Gender;
  birth: string;
  mbti?: string;
  interestTag?: (string | number)[];
  location?: ILocation;
}

export interface ISimpleUserProfile {
  memberId: number;
  nickname: string;
  imageUrl: string;
  selfDescription?: string;
}

export enum AlarmType {
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  CHAT_ROOM_INVITATION = 'CHAT_ROOM_INVITATION',
}

export interface IAlarmItem {
  id: number;
  type: AlarmType;
  message: string;
  senderId: number;
  receiverId: number;
  invitedChatRoomId?: number;
  createdAt: string;
  nickname: string;
  senderProfileImage: string;
}

export interface IGetAlarmListRequest extends IPaginationParams {
  lastAlarmId?: number;
}

export interface IGetAlarmListResponse extends IPaginationResponse {
  content: IAlarmItem[];
}
