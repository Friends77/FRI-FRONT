import { useProfile } from '@/hooks/user/useProfile';
import * as Styled from './SideBarProfile.styled';
import { useRecoilState } from 'recoil';
import profileAtom from '@/recoil/user/profile';
import { ReactEventHandler, useEffect } from 'react';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import Notification from '@/components/@common/SVG/Icon/Notification';

const SideBarProfile = () => {
  const { data } = useProfile();
  const [profile, setProfile] = useRecoilState(profileAtom);

  const handleImgError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = defaultProfileImg;
  };

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);
  return (
    <Styled.Wrapper>
      {profile ? (
        <Styled.ProfileContent>
          <Styled.ProfileImg
            src={profile.imageUrl}
            alt="profile image"
            onError={handleImgError}
          />
          <Styled.Nickname>{profile.nickname}</Styled.Nickname>
        </Styled.ProfileContent>
      ) : (
        <Styled.ProfileContent>
          <Styled.ProfileImg src={defaultProfileImg} alt="기본 프로필 이미지" />
          <Styled.Nickname>로그인이 필요해요.</Styled.Nickname>
        </Styled.ProfileContent>
      )}
      <Styled.NotificationBtn>
        {/* 알림이 있는 경우 && <Styled.NotificationBadge /> */}
        <Notification title="알림" width="32px" height="32px" />
      </Styled.NotificationBtn>
    </Styled.Wrapper>
  );
};

export default SideBarProfile;
