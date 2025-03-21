import { HOME_CONSTANT } from '@/constants/home';
import profileAtom from '@/recoil/user/profile';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const useGetTagLength = () => {
  const myProfile = useRecoilValue(profileAtom);

  const [myTagLength, setMyTagLength] = useState<number>(
    HOME_CONSTANT.FRIEND_RECO_WITH_INTEREST_CARD,
  );

  useEffect(() => {
    if (myProfile) {
      setMyTagLength(myProfile.interestTag.length);
    }
  }, [myProfile]);

  return myTagLength;
};

export default useGetTagLength;
