import { useRefresh } from "@/hooks/auth/useRefresh";
import { useEffect, useState } from "react";

interface ITokenRefresherProps {
  children: React.ReactNode;
}

/**
 * @TokenRefresher
 *  @사용목적
 *      1) 서비스 접근 시 토큰 재발급
 *  @주요기능
 *      1) 서비스 접근 시 토큰 재발급
 *      2) 토큰 재발급(refresh) 요청 동안 로딩 처리
 */
const TokenRefresher = ({ children }: ITokenRefresherProps) => {
  const [isLoading, setIsLoading] = useState(true);
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

export default TokenRefresher;
