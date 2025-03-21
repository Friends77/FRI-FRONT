import Tag from '@/components/@common/Tag';
import useGetCategory from '@/hooks/@common/useGetCategory';
import FriendCard from '../FriendItem';
import * as Styled from './FriendsCard.styled';
import { useFriendsByTag } from '@/hooks/home/useFriendsByTag';
import { useEffect, useState } from 'react';
import { IInterestTag } from '@/types/@common';
import { HOME_CONSTANT } from '@/constants/home';

export interface IFriendsCardProps {
  categoryId: number;
}

const FriendsCard = ({ categoryId }: IFriendsCardProps) => {
  const [tag, setTag] = useState<IInterestTag | null>(null);

  const { data: tags } = useGetCategory();

  useEffect(() => {
    if (tags) {
      const tag = tags.find((tag) => tag.id === categoryId)!;
      setTag(tag);
    }
  }, [categoryId, tags]);

  // 사용자 선택 태그 기반 추천 유저 API
  const { data: friends } = useFriendsByTag(categoryId);

  return (
    <Styled.FriendsCardWrapper>
      <ul>{tag && <Tag size="large" icon={tag?.image} label={tag?.name} />}</ul>
      <Styled.FriendsCard>
        {friends?.content
          .slice(0, HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST)
          .map((friend) => (
            <FriendCard
              key={friend.id}
              id={friend.id}
              imageUrl={friend.imageUrl}
              nickname={friend.nickname}
            />
          ))}
      </Styled.FriendsCard>
    </Styled.FriendsCardWrapper>
  );
};

export default FriendsCard;
