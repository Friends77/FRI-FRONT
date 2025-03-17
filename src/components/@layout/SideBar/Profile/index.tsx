import * as Styled from './Profile.styled';
import { useSetRecoilState } from 'recoil';
import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import ProfileImage from '@/components/@common/ProfileImage';
import Person from '@/components/@common/SVG/Icon/Person';
import Logout from '@/components/@common/SVG/Icon/Logout';
import { useLogout } from '@/hooks/auth/useLogout';
import { USER_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';
import useGetMyProfile from '@/hooks/user/useGetMyProfile';

const Profile = () => {
  const navigate = useNavigate();

  const { data: myProfile } = useGetMyProfile();

  const setProfile = useSetRecoilState(profileAtom);

  const [isOpenMyMenu, setIsOpenMyMenu] = useState(false);

  const { mutate: logout } = useLogout();

  const handleToggleMyMenu = () => {
    setIsOpenMyMenu((prevState) => !prevState);
  };

  const handleGoMyPage = () => {
    setIsOpenMyMenu(false);
    navigate(USER_PATH.PROFILE);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (myProfile) {
      setProfile(myProfile);
    }
  }, [myProfile, setProfile]);

  return (
    <>
      {isOpenMyMenu && (
        <Styled.MyMenu>
          <Styled.MyPage>
            <Styled.MyPageButton type="button" onClick={handleGoMyPage}>
              <Person title="마이페이지" width="24" height="24" />
              마이페이지
            </Styled.MyPageButton>
          </Styled.MyPage>
          <Styled.Logout>
            <Styled.LogoutButton type="button" onClick={handleLogout}>
              <Logout title="로그아웃" width="24" height="24" />
              로그아웃
            </Styled.LogoutButton>
          </Styled.Logout>
        </Styled.MyMenu>
      )}
      <Styled.ProfileContent type="button" onClick={handleToggleMyMenu}>
        <ProfileImage src={myProfile?.imageUrl} alt="profile image" size={52} />
        <Styled.Nickname>{myProfile?.nickname}</Styled.Nickname>
      </Styled.ProfileContent>
    </>
  );
};

export default Profile;
