import { useProfile } from '@/hooks/user/useProfile';
import * as Styled from './SideBarProfile.styled';
import { useSetRecoilState } from 'recoil';
import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import ProfileImage from '@/components/@common/ProfileImage';
import Person from '@/components/@common/SVG/Icon/Person';
import Logout from '@/components/@common/SVG/Icon/Logout';
import { useLogout } from '@/hooks/auth/useLogout';
import { USER_PATH } from '@/constants/routes';
import { useNavigate } from 'react-router';

const SideBarProfile = () => {
  const navigate = useNavigate();

  const { data } = useProfile();

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
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);

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
        <ProfileImage src={data.imageUrl} alt="profile image" size={52} />
        <Styled.Nickname>{data.nickname}</Styled.Nickname>
      </Styled.ProfileContent>
    </>
  );
};

export default SideBarProfile;
