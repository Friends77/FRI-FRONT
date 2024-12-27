import { createGlobalStyle } from "styled-components";

import PretendardBold from "@/assets/fonts/Pretendard-Bold.woff";
import PretendardRegular from "@/assets/fonts/Pretendard-Regular.woff";

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: Pretendard-Bold;
    src: url(${PretendardBold}) format('woff');
    }

    @font-face {
    font-family: Pretendard-Regular;
    src: url(${PretendardRegular}) format('woff');
    }
`;

export default GlobalStyle;
