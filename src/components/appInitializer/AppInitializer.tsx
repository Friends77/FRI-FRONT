import { useRefresh } from "@/hooks/auth";
import isLoggedInAtom from "@/recoil/isLoggedIn";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IAppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: IAppInitializerProps) => {
  // isFirstVisit: sessionStorage에 저장된 값이 있다면 false, 없다면 true(최초 방문)
  const isFirstVisit = !window.sessionStorage.getItem("firstVisit");
  // AT 기반 로그인 여부
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  // 로그인하지 않았고 최초 방문인 경우 로딩
  const [isLoading, setIsLoading] = useState(!isLoggedIn && isFirstVisit);
  const { mutateAsync } = useRefresh();

  useEffect(() => {
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

    if (isLoading) {
      console.log("refresh in useEffect");
      // 최초 방문을 했다고 sessionStorage에 저장
      window.sessionStorage.setItem("firstVisit", "visited");
      refresh();
    }
  }, [isLoading, setIsLoading, mutateAsync]);

  if (isLoading) {
    console.log("loading...");
    return <div>Loading...😂</div>;
  }
  return <>{children}</>;
};

export default AppInitializer;
