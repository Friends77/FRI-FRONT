import Assignment from '@/components/@common/SVG/Icon/Assignment';
import Home from '@/components/@common/SVG/Icon/Home';
import Logo from '@/components/@common/SVG/Icon/Logo';
import Profile from '@/components/@common/SVG/Icon/Profile';
import Search from '@/components/@common/SVG/Icon/Search';
import Setting from '@/components/@common/SVG/Icon/Setting';
import {
  BOARD_PATH,
  ROOT_PATH,
  SEARCH_PATH,
  SETTING_PATH,
  USER_PATH,
} from '@/constants/routes';
import { Link } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import * as Styled from './NavBar.styled';
import Collapse from '@/components/@common/SVG/Icon/Collapse';
import HomeFill from '@/components/@common/SVG/Icon/HomeFill';
import AssignmentFill from '@/components/@common/SVG/Icon/AssignmentFill';
import ProfileFill from '@/components/@common/SVG/Icon/ProfileFill';
import SettingFill from '@/components/@common/SVG/Icon/SettingFill';

const navMenus = [
  {
    Icon: Home,
    ActiveIcon: HomeFill,
    title: '홈',
    path: ROOT_PATH.ROOT,
  },
  {
    Icon: Search,
    // 아이콘 수정
    ActiveIcon: HomeFill,
    title: '검색',
    path: SEARCH_PATH.ROOT,
  },
  {
    Icon: Assignment,
    ActiveIcon: AssignmentFill,
    title: '게시물',
    path: BOARD_PATH.ROOT,
  },
  {
    Icon: Profile,
    ActiveIcon: ProfileFill,
    title: '마이페이지',
    path: USER_PATH.PROFILE,
  },
  {
    Icon: Setting,
    ActiveIcon: SettingFill,
    title: '설정',
    path: SETTING_PATH.ROOT,
  },
];

const NavBar = () => {
  return (
    <Styled.Wrapper>
      <Link to={ROOT_PATH.ROOT}>
        <Logo title="logo" width="48px" height="48px" />
      </Link>
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
          <Styled.CollapseBtn>
            <Collapse title="collapse sidebar" width="32px" height="32px" />
            <Styled.NavMenuText>숨기기</Styled.NavMenuText>
          </Styled.CollapseBtn>
        </Styled.NavMenu>
      </Styled.NavMenuList>
    </Styled.Wrapper>
  );
};

export default NavBar;
