import { useRecoilState, useRecoilValue } from 'recoil';
import * as Styled from './SideBar.styled';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import { useProfile } from '@/hooks/user/useProfile';
import profileAtom from '@/recoil/user/profile';
import { useEffect } from 'react';

const SideBar = () => {
  const { data } = useProfile();
  const isSideBarOpen = useRecoilValue(isSideBarOpenAtom);
  const [profile, setProfile] = useRecoilState(profileAtom);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);
  return (
    <Styled.Wrapper $isOpen={isSideBarOpen}>
      <Styled.Header>
        {profile ? (
          <Styled.ProfileContent>
            <Styled.ProfileImg src={profile?.imageUrl} alt="profile image" />
            <Styled.Nickname>{profile?.nickname}</Styled.Nickname>
          </Styled.ProfileContent>
        ) : (
          <Styled.ProfileContent>
            <Styled.ProfileImg
              src={defaultProfileImg}
              alt="기본 프로필 이미지"
            />
            <Styled.Nickname>로그인이 필요해요.</Styled.Nickname>
          </Styled.ProfileContent>
        )}
      </Styled.Header>
    </Styled.Wrapper>
  );
};

export default SideBar;
