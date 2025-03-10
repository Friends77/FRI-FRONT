import Tag from '@/components/@common/Tag';
import { useFetchCategory } from '@/hooks/auth/useFetchCategory';
import FriendCard from '../FriendCard';
import * as Styled from './FriendsGrid.styled';
import { useFriendsByTag } from '@/hooks/home/useFriendsByTag';
import { useEffect, useState } from 'react';
import { IInterestTag } from '@/types/@common';

export interface IFriendsGridProps {
  categoryId: number;
}

const FriendsGrid = ({ categoryId }: IFriendsGridProps) => {
  const [tag, setTag] = useState<IInterestTag | null>(null);

  // 카테고리 조회
  const { data: tags } = useFetchCategory();

  // 사용자 선택 태그 정보 조회
  useEffect(() => {
    if (tags) {
      const tag = tags.find((tag) => tag.id === categoryId)!;
      setTag(tag);
    }
  }, [categoryId, tags]);

  // 사용자 선택 태그 기반 추천 유저 API
  const { data: friends } = useFriendsByTag(categoryId);

  if (!friends) {
    <div>추천 친구 없음</div>;
  }

  return (
    <Styled.FriendsGridWrapper>
      <ul>{tag && <Tag size="large" icon={tag?.image} label={tag?.name} />}</ul>
      <Styled.FriendsGrid>
        {friends?.content.map((friend) => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            imageUrl={friend.imageUrl}
            nickname={friend.nickname}
          />
        ))}
      </Styled.FriendsGrid>
    </Styled.FriendsGridWrapper>
  );
};

export default FriendsGrid;
