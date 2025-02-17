import ProfileImage from '@/components/@common/ProfileImage';
import * as Styled from './FriendCard.styled';

export interface IFriendCardProps {
  imageUrl: string;
  nickname: string;
}

const FriendCard = ({ imageUrl, nickname }: IFriendCardProps) => {
  return (
    <Styled.FriendCardArticle>
      <ProfileImage size={86} src={imageUrl} />
      <Styled.FriendCardSpan>{nickname}</Styled.FriendCardSpan>
    </Styled.FriendCardArticle>
  );
};

export default FriendCard;
