import userLocationAtom from '@/recoil/auth/userLocation';
import { useEffect, useState } from 'react';
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

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');

      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};
