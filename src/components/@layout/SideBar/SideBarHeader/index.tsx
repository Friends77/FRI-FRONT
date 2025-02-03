import * as Styled from './SideBarHeader.styled';
import { Suspense } from 'react';
import Notification from '@/components/@common/SVG/Icon/Notification';
import SideBarProfile from '../SideBarProfile';
import SideBarProfileSkeleton from '../SideBarProfileSkeleton';

const SideBarHeader = () => {
  return (
    <Styled.Wrapper>
      <Suspense fallback={<SideBarProfileSkeleton />}>
        <SideBarProfile />
      </Suspense>
      <Styled.NotificationBtn>
        {/* 알림이 있는 경우 && <Styled.NotificationBadge /> */}
        <Notification title="알림" width="32px" height="32px" />
      </Styled.NotificationBtn>
    </Styled.Wrapper>
  );
};

export default SideBarHeader;
