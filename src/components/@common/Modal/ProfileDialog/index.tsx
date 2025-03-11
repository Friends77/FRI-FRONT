import * as Styled from './ProfileDialog.styled';
import { IUserProfile } from '@/types/@common';
import CustomModal from '../CustomModal';
import ProfileImage from '../../ProfileImage';
import { getInternationalAge } from '@/utils/formatter/time';
import Tag from '../../Tag';

interface IProfileDialog {
  /** 사용자 프로필 정보 */
  profile: IUserProfile;
  /** 다이얼로그 닫기 버튼 클릭 시 실행될 함수 */
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
      <Styled.ProfileModalContainer>
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
          {interestTag.map((tag) => (
            <Tag key={tag.id} size="large" icon={tag.image} label={tag.name} />
          ))}
        </Styled.TagContainer>
      </Styled.ProfileModalContainer>
    </CustomModal>
  );
};

export default ProfileDialog;
