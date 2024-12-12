import { Outlet } from "react-router";
import "./App.css";
import { useRecoilValue } from "recoil";
import isLoggedInAtom from "./recoil/isLoggedIn/atom";

function App() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return (
    <>
      {/* 로그인 확인용으로 간단하게 만들어놨습니다! 머지하기 전에 이 코드는 삭제하고 진행하겠습니다 */}
      <span>{isLoggedIn ? '로그인 O 👍' : '로그인 X 👎'}</span>
      <Outlet />
    </>
  );
}

export default App;
