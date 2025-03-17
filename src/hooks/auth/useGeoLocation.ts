import userLocationAtom from '@/recoil/auth/userLocation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface UseGeoLocationParams {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = (options = {}) => {
  // 사용자 위치 전역 저장
  const [location, setLocation] =
    useRecoilState<UseGeoLocationParams>(userLocationAtom);

  const [error, setError] = useState('');

  const handleSuccess = useCallback(
    (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;

      setLocation({
        latitude,
        longitude,
      });
    },
    [setLocation],
  );

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');

      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [handleSuccess, options]);

  return { location, error };
};
