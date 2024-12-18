import { useRefresh } from "@/hooks/auth";
import isLoggedInAtom from "@/recoil/isLoggedIn";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IAppInitializerProps {
  children: React.ReactNode;
}

/**
 * @AppInitializer
 *  @사용목적
 *      1) 서비스 접근 시 토큰 재발급
 *  @주요기능
 *      1) 로그인 여부 판단 후 토큰 재발급(refresh) 요청
 *      2) 비로그인 상태인 경우 토큰 재발급(refresh) 요청 동안 로딩 처리
 */
const AppInitializer = ({ children }: IAppInitializerProps) => {
  // AT 기반 로그인 여부
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [isLoading, setIsLoading] = useState(!isLoggedIn);
  const { mutateAsync } = useRefresh();

  useEffect(() => {
    if (!isLoading) return;

    const refresh = async () => {
      try {
        // refresh api 요청
        await mutateAsync();
      } catch (err) {
        console.log("Refresh Result:", err);
      } finally {
        setIsLoading(false);
      }
    };

    refresh();
  }, [isLoading, setIsLoading, mutateAsync]);

  if (isLoading) {
    return <div>Loading...😂</div>;
  }

  return <>{children}</>;
};

export default AppInitializer;
