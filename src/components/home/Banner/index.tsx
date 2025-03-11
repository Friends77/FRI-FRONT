import chatRoomThumbnail from '@/assets/images/chatRoomThumbnail.png';
import Profiles from '@/assets/images/profiles.png';
import { AUTH_PATH, CHAT_PATH } from '@/constants/routes';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router';
import * as Styled from './Banner.styled';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import { AUTH_ERROR_MSG } from '@/constants/message';

export interface BannerProps {
  roomId: number;
  title: ReactNode;
  subTitle: string;
}

const Banner = ({ roomId, title, subTitle }: BannerProps) => {
  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const handleChatRoomClick = useCallback(
    (roomId: number) => {
      if (!isLoggedIn) {
        alert(AUTH_ERROR_MSG.LOGIN_REQUIRED);
        navigate(AUTH_PATH.LOGIN);
      } else {
        const path = CHAT_PATH.CHAT_ROOM.replace(':roomId', roomId.toString());
        navigate(path);
      }
    },
    [isLoggedIn, navigate],
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
              <Styled.ChatRoomImage src={chatRoomThumbnail} />
              <Styled.ChatRoomInfo>
                오징어게임 시즌3 존버방
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
              <Styled.Button
                type="button"
                onClick={() => handleChatRoomClick(roomId)}
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
