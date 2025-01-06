import Assignment from '@/components/@common/SVG/Icon/Assignment';
import Home from '@/components/@common/SVG/Icon/Home';
import Logo from '@/components/@common/SVG/Icon/Logo';
import Profile from '@/components/@common/SVG/Icon/Profile';
import Search from '@/components/@common/SVG/Icon/Search';
import Setting from '@/components/@common/SVG/Icon/Setting';
import {
  BOARD_PATH,
  PROFILE_PATH,
  ROOT_PATH,
  SEARCH_PATH,
  SETTING_PATH,
} from '@/constants/routes';
import { Link } from 'react-router';

const navMenus = [
  {
    icon: Home,
    title: '홈',
    path: ROOT_PATH.ROOT,
  },
  {
    icon: Search,
    title: '검색',
    path: SEARCH_PATH.ROOT,
  },
  {
    icon: Assignment,
    title: '게시물',
    path: BOARD_PATH.ROOT,
  },
  {
    icon: Profile,
    title: '마이페이지',
    path: PROFILE_PATH.ROOT,
  },
  {
    icon: Setting,
    title: '설정',
    path: SETTING_PATH.ROOT,
  },
];

const NavBar = () => {
  return (
    <nav>
      <Link to={ROOT_PATH.ROOT}>
        <Logo title="logo" width="48px" height="48px" />
      </Link>
    </nav>
  );
};

export default NavBar;
