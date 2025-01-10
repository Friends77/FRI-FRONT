import * as Styled from './SideBarHeader.styled';
import { useRecoilValue } from 'recoil';
import { Suspense } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import SideBarProfile from '../SideBarProfile';
import defaultProfileImg from '@/assets/images/defaultProfile.png';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';
import SideBarProfileSkeleton from '../SideBarProfileSkeleton';

const SideBarHeader = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return (
    <Styled.Wrapper>
      {isLoggedIn ? (
        <Suspense fallback={<SideBarProfileSkeleton />}>
          <SideBarProfile />
        </Suspense>
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

export default SideBarHeader;
