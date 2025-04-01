import { css } from 'styled-components';

const typoCreator = (
  fontFamily: string,
  fontWeight: number,
  fontSize: string,
  lineHeight: string,
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
    Black: '#000000',
    White: '#FFFFFF',
    Gray_100: '#FAFAFA',
    Gray_200: '#F2F2F2',
    Gray_300: '#E6E6E6',
    Gray_400: '#CCCCCC',
    Gray_500: '#B3B3B3',
    Gray_600: '#999999',
    Gray_700: '#666666',
    Gray_800: '#4D4D4D',
    Gray_900: '#333333',
    Gray_1000: '#1A1A1A',
    Green_900: '#507513',
    Green_800: '#678E1F',
    Green_700: '#87B032',
    Green_600: '#A9D249',
    Green_500: '#CEF564',
    Green_400: '#DEF98A',
    Green_300: '#E8FCA2',
    Green_200: '#F2FEC1',
    Green_100: '#F9FEE0',
    Green_50: '#FDFFF1',
    Blue_900: '#120075',
    Blue_800: '#19008E',
    Blue_700: '#2400B0',
    Blue_600: '#3100D2',
    Blue_500: '#4000F5',
    Blue_400: '#743EF9',
    Blue_300: '#9464FC',
    Blue_200: '#BB98FE',
    Blue_100: '#DECBFE',
    Blue_50: '#EFE5FE',
    Alter_warning: '#FFB84C',
    Alter_error: '#FF664A',
    Alter_success: '#4CAF90',
    Alter_information: '#2D84FB',
  },
  typo: {
    D1_B: typoCreator('Pretendard-Bold', 600, '28px', '32px'),
    D1_R: typoCreator('Pretendard-Regular', 200, '28px', '32px'),
    D2_B: typoCreator('Pretendard-Bold', 600, '26px', '30px'),
    D2_R: typoCreator('Pretendard-Regular', 200, '26px', '30px'),
    H1_B: typoCreator('Pretendard-Bold', 600, '24px', '28px'),
    H1_R: typoCreator('Pretendard-Regular', 200, '24px', '28px'),
    H2_B: typoCreator('Pretendard-Bold', 600, '22px', '26px'),
    H2_R: typoCreator('Pretendard-Regular', 200, '22px', '26px'),
    T1_B: typoCreator('Pretendard-Bold', 600, '20px', '24px'),
    T1_R: typoCreator('Pretendard-Regular', 200, '20px', '24px'),
    T2_B: typoCreator('Pretendard-Bold', 600, '18px', '22px'),
    T2_R: typoCreator('Pretendard-Regular', 200, '18px', '22px'),
    B1_B: typoCreator('Pretendard-Bold', 600, '16px', '20px'),
    B1_R: typoCreator('Pretendard-Regular', 200, '16px', '20px'),
    B2_B: typoCreator('Pretendard-Bold', 600, '14px', '18px'),
    B2_R: typoCreator('Pretendard-Regular', 200, '14px', '18px'),
    Label_B: typoCreator('Pretendard-Bold', 600, '12px', '16px'),
    Label_R: typoCreator('Pretendard-Regular', 200, '12px', '16px'),
  },
};

export type TColor = keyof (typeof Theme)['colors'];

export type TTypo = keyof (typeof Theme)['typo'];
