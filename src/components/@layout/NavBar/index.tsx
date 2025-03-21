import Home from '@/components/@common/SVG/Icon/Home';
import Logo from '@/components/@common/SVG/Icon/Logo';
import Profile from '@/components/@common/SVG/Icon/Profile';
import { ROOT_PATH, USER_PATH } from '@/constants/routes';
import { Link } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import * as Styled from './NavBar.styled';
import Collapse from '@/components/@common/SVG/Icon/Collapse';
import HomeFill from '@/components/@common/SVG/Icon/HomeFill';
import ProfileFill from '@/components/@common/SVG/Icon/ProfileFill';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import isSideBarOpenAtom from '@/recoil/layout/isSideBarOpen';
import Expand from '@/components/@common/SVG/Icon/Expand';
import isOpenAlarmAtom from '@/recoil/user/isOpenAlarm/atom';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';

const NavBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const navMenus = [
    {
      Icon: Home,
      ActiveIcon: HomeFill,
      title: '홈',
      path: ROOT_PATH.ROOT,
    },
    ...(isLoggedIn
      ? [
          {
            Icon: Profile,
            ActiveIcon: ProfileFill,
            title: '마이페이지',
            path: USER_PATH.PROFILE,
          },
        ]
      : []),
  ];

  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(isSideBarOpenAtom);

  const setIsOpenAlarm = useSetRecoilState(isOpenAlarmAtom);

  const handleSideBarToggle = () => {
    setIsSideBarOpen((prev) => !prev);
    setIsOpenAlarm(false);
  };

  return (
    <Styled.Wrapper>
      <h1>
        <Link to={ROOT_PATH.ROOT}>
          <Logo title="친구하자" width="48px" height="48px" />
        </Link>
      </h1>
      <Styled.NavMenuList>
        {navMenus.map(({ Icon, ActiveIcon, title, path }) => (
          <Styled.NavMenu key={uuidv4()}>
            <Styled.NavMenuLink to={path}>
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <Styled.NavMenuIcon $isActive={isActive}>
                    {isActive ? (
                      <ActiveIcon title={title} width="24px" height="24px" />
                    ) : (
                      <Icon title={title} width="32px" height="32px" />
                    )}
                  </Styled.NavMenuIcon>
                  <Styled.NavMenuText $isActive={isActive}>
                    {title}
                  </Styled.NavMenuText>
                </>
              )}
            </Styled.NavMenuLink>
          </Styled.NavMenu>
        ))}
        <Styled.NavMenu>
          <Styled.CollapseBtn onClick={handleSideBarToggle}>
            {isSideBarOpen ? (
              <>
                <Collapse title="사이드바 숨기기" width="32px" height="32px" />
                <Styled.NavMenuText>숨기기</Styled.NavMenuText>
              </>
            ) : (
              <>
                <Expand title="사이드바 펼치기" width="32px" height="32px" />
                <Styled.NavMenuText>펼치기</Styled.NavMenuText>
              </>
            )}
          </Styled.CollapseBtn>
        </Styled.NavMenu>
      </Styled.NavMenuList>
    </Styled.Wrapper>
  );
};

export default NavBar;
