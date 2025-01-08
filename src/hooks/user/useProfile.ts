import { getProfile } from '@/apis/user';
import { USER_KEYS } from '@/constants/@queryKeys';
import accessTokenAtom from '@/recoil/auth/accessToken';
import { getMemberIdFromToken } from '@/utils/token';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useProfile = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const memberId = getMemberIdFromToken(accessToken);

  return useSuspenseQuery({
    queryKey: USER_KEYS.PROFILE(memberId),
    queryFn: getProfile,
  });
};
