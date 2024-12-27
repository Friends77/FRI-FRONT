import { css } from "styled-components";

const typoCreator = (
  fontFamily: string,
  fontWeight: number,
  fontSize: string,
  lineHeight: string
) => {
  return css`
    font-family: ${fontFamily};
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const Theme = {
  colors: {
    White: "#FFFFFF",
    Gray_100: "#FAFAFA",
    Gray_200: "#F2F2F2",
    Gray_300: "#E6E6E6",
    Gray_400: "#CCCCCC",
    Gray_500: "#B3B3B3",
    Gray_600: "#999999",
    Gray_700: "#666666",
    Gray_800: "#4D4D4D",
    Gray_900: "#333333",
    Gray_1000: "#1A1A1A",
    Green_900: "#507513",
    Green_800: "#678E1F",
    Green_700: "#87B032",
    Green_600: "#A9D249",
    Green_500: "#CEF564",
    Green_400: "#DEF98A",
    Green_300: "#E8FCA2",
    Green_200: "#F2FEC1",
    Green_100: "#F9FEE0",
    Green_50: "#FDFFF1",
    Blue_900: "#120075",
    Blue_800: "#19008E",
    Blue_700: "#2400B0",
    Blue_600: "#3100D2",
    Blue_500: "#4000F5",
    Blue_400: "#743EF9",
    Blue_300: "#9464FC",
    Blue_200: "#BB98FE",
    Blue_100: "#DECBFE",
    Blue_50: "#EFE5FE",
    Alter_warning: "#FFB84C",
    Alter_error: "#FF664A",
    Alter_success: "#4CAF90",
    Alter_information: "#2D84FB",
  },
  typo: {
    D1_B: typoCreator("Pretendard-Bold", 700, "36px", "54px"),
    D1_R: typoCreator("Pretendard-Regular", 400, "26px", "130%"),
    D2_B: typoCreator("Pretendard-Bold", 700, "32px", "41px"),
    D2_R: typoCreator("Pretendard-Regular", 400, "32px", "130%"),
    H1_B: typoCreator("Pretendard-Bold", 700, "26px", "130%"),
    H1_R: typoCreator("Pretendard-Regular", 400, "26px", "130%"),
    H2_B: typoCreator("Pretendard-Bold", 700, "22px", "30px"),
    H2_R: typoCreator("Pretendard-Regular", 400, "22px", "30px"),
    T1_B: typoCreator("Pretendard-Bold", 700, "20px", "26px"),
    T1_R: typoCreator("Pretendard-Regular", 400, "20px", "26px"),
    T2_B: typoCreator("Pretendard-Bold", 700, "18px", "30px"),
    T2_R: typoCreator("Pretendard-Regular", 400, "18px", "30px"),
    B1_B: typoCreator("Pretendard-Bold", 700, "16px", "26px"),
    B1_R: typoCreator("Pretendard-Regular", 400, "16px", "26px"),
    B2_B: typoCreator("Pretendard-Bold", 700, "14px", "20px"),
    B2_R: typoCreator("Pretendard-Regular", 400, "14px", "20px"),
    Label_B: typoCreator("Pretendard-Bold", 700, "12px", "16px"),
    Label_R: typoCreator("Pretendard-Regular", 400, "12px", "16px"),
  },
};

export type TColor = keyof (typeof Theme)["colors"];
export type TTypo = keyof (typeof Theme)["typo"];
