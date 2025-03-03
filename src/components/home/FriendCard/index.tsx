import ProfileImage from '@/components/@common/ProfileImage';
import * as Styled from './FriendCard.styled';
import { useEffect, useState } from 'react';
import ProfileDialog from '@/components/@common/Modal/ProfileDialog';
import { IUserProfile } from '@/types/@common';
import useGetProfile from '@/hooks/@common/useGetProfile';
import { useRecoilValue } from 'recoil';
import isLoggedInAtom from '@/recoil/auth/isLoggedIn';

export interface IFriendCardProps {
  id: number;
  imageUrl: string;
  nickname: string;
}

const FriendCard = ({ id, imageUrl, nickname }: IFriendCardProps) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null,
  );

  const [selectedProfile, setSelectedProfile] = useState<IUserProfile | null>(
    null,
  );

  const { data: userProfile } = useGetProfile(selectedProfileId);

  useEffect(() => {
    if (userProfile) {
      setSelectedProfile(userProfile);
    }
  }, [userProfile]);

  const handleOpenProfile = (memberId: number) => {
    if (isLoggedIn) {
      setSelectedProfileId(memberId);
      setIsOpenProfile(true);
    }
  };

  const handleCloseProfile = () => {
    setSelectedProfileId(null);
    setSelectedProfile(null);
    setIsOpenProfile(false);
  };

  return (
    <>
      {isOpenProfile && selectedProfile && (
        <ProfileDialog profile={selectedProfile} onClose={handleCloseProfile} />
      )}
      <Styled.FriendCardArticle
        onClick={() => handleOpenProfile(id)}
        $isLoggedIn={!!isLoggedIn}
      >
        <ProfileImage size={86} src={imageUrl} />
        <Styled.FriendCardSpan>{nickname}</Styled.FriendCardSpan>
      </Styled.FriendCardArticle>
    </>
  );
};

export default FriendCard;
