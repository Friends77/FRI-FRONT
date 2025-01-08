import { useProfile } from '@/hooks/user/useProfile';
import * as Styled from '../SideBarHeader/SideBarHeader.styled';
import { useSetRecoilState } from 'recoil';
import profileAtom from '@/recoil/user/profile';
import { ReactEventHandler, useEffect } from 'react';
import defaultProfileImg from '@/assets/images/defaultProfile.png';

const SideBarProfile = () => {
  const { data } = useProfile();
  const setProfile = useSetRecoilState(profileAtom);

  const handleImgError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = defaultProfileImg;
  };

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data, setProfile]);
  return (
    <Styled.ProfileContent>
      <Styled.ProfileImg
        src={data.imageUrl}
        alt="profile image"
        onError={handleImgError}
      />
      <Styled.Nickname>{data.nickname}</Styled.Nickname>
    </Styled.ProfileContent>
  );
};

export default SideBarProfile;
