import * as Styled from './ProfileDialog.styled';
import { IUserProfile } from '@/types/@common';
import CustomModal from '../CustomModal';
import ProfileImage from '../../ProfileImage';
import { getInternationalAge } from '@/utils/formatter/time';

interface IProfileDialog {
  profile: IUserProfile;
  onClose: () => void;
}

const ProfileDialog = ({ profile, onClose }: IProfileDialog) => {
  const {
    imageUrl,
    nickname,
    selfDescription,
    birth,
    gender,
    mbti,
    interestTag,
  } = profile;

  return (
    <CustomModal title="프로필 정보" onClose={onClose}>
      <Styled.ProfileHeader>
        <ProfileImage size={64} src={imageUrl} alt={nickname} />
        <Styled.NameContainer>
          <Styled.Nickname>{nickname}</Styled.Nickname>
          {selfDescription && (
            <Styled.Description>{selfDescription}</Styled.Description>
          )}
        </Styled.NameContainer>
      </Styled.ProfileHeader>

      <Styled.InfoTable>
        <Styled.InfoRow>
          <Styled.InfoLabel>나이</Styled.InfoLabel>
          <Styled.InfoLabel>성별</Styled.InfoLabel>
          <Styled.InfoLabel>MBTI</Styled.InfoLabel>
        </Styled.InfoRow>
        <Styled.InfoRow>
          <Styled.InfoValue>{getInternationalAge(birth)}세</Styled.InfoValue>
          <Styled.InfoValue>{gender}</Styled.InfoValue>
          <Styled.InfoValue>{mbti || '-'}</Styled.InfoValue>
        </Styled.InfoRow>
      </Styled.InfoTable>

      <Styled.TagContainer>
        {/* TODO: 관심사 카테고리 머지되면 작업 */}
        {/* {interestTag.map((tag) => (
        ))} */}
      </Styled.TagContainer>
    </CustomModal>
  );
};

export default ProfileDialog;
