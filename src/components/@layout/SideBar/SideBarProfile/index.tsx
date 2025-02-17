import { useProfile } from '@/hooks/user/useProfile';
import * as Styled from './SideBarProfile.styled';
import { useSetRecoilState } from 'recoil';
import profileAtom from '@/recoil/user/profile';
import { useEffect } from 'react';
import ProfileImage from '@/components/@common/ProfileImage';

const SideBarProfile = () => {
  const { data } = useProfile();

  const setProfile = useSetRecoilState(profileAtom);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);

  return (
    <Styled.ProfileContent>
      <ProfileImage src={data.imageUrl} alt="profile image" size={52} />
      <Styled.Nickname>{data.nickname}</Styled.Nickname>
    </Styled.ProfileContent>
  );
};

export default SideBarProfile;
