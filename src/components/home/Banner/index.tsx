/**
 * 홈페이지: 배너
 * @author 선우
 */

import { ReactNode, useCallback } from 'react';
import * as Styled from './Banner.styled';
import useGetChatRoomDetail from '@/hooks/chat/useGetChatRoomDetail';
import { useRecoilValue } from 'recoil';
import roomDetailAtom from '@/recoil/chat/roomDetail';
import Profiles from '@/assets/images/profiles.png';
import { CHAT_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';

export interface BannerProps {
  roomId: number;
  title: ReactNode;
  subTitle: string;
}

const Banner = ({ roomId, title, subTitle }: BannerProps) => {
  const navigate = useNavigate();

  const chatRoomDetail = useRecoilValue(roomDetailAtom);

  useGetChatRoomDetail({ roomId });

  const handleChatRoomClick = useCallback(
    (roomId: number) => {
      const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomId.toString());
      navigate(path);
    },
    [navigate],
  );

  return (
    <Styled.Container>
      <Styled.InnerContainer>
        <Styled.Badge>HOT</Styled.Badge>
        <Styled.ContentSection>
          <Styled.TitleSection>
            {title}
            <Styled.SubTitle>{subTitle}</Styled.SubTitle>
          </Styled.TitleSection>
          <Styled.BottomSection>
            <Styled.ChatRoomInfoSection>
              <Styled.ChatRoomImage src={chatRoomDetail?.imageUrl} />
              <Styled.ChatRoomInfo>
                {chatRoomDetail?.title}
                {/* 채팅방 상세 조회 API에 채팅방 참여 유저 프로필 이미지 필드 추가 필요 */}
                <img
                  src={Profiles}
                  style={{
                    width: 70,
                    height: 22,
                  }}
                />
              </Styled.ChatRoomInfo>
            </Styled.ChatRoomInfoSection>
            <Styled.ButtonSection>
              <Styled.Button type="button" bgcolor="#EFE5FE40" typo="B2_R">
                자세히 보기
              </Styled.Button>
              <Styled.Button
                type="button"
                bgcolor="Blue_500"
                typo="B2_B"
                onClick={() => handleChatRoomClick(chatRoomDetail!.id)}
              >
                참여하기
              </Styled.Button>
            </Styled.ButtonSection>
          </Styled.BottomSection>
        </Styled.ContentSection>
      </Styled.InnerContainer>
    </Styled.Container>
  );
};

export default Banner;
