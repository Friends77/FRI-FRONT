import styled from 'styled-components';

export const Label = styled.label`
  ${({ theme }) => theme.typo.T2_R}
  color: ${({ theme }) => theme.colors.Gray_900};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckBox = styled.input`
  appearance: none;
  border: 1.8px solid ${({ theme }) => theme.colors.Gray_700};
  border-radius: 2px;
  width: 16px;
  height: 16px;

  &:checked {
    border-color: transparent;
    background-size: 120% 120%;
    background-position: 50%;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.6 10.0922L4.10375 7.59625C4.01025 7.50258 3.8955 7.45258 3.7595 7.44625C3.62367 7.43975 3.50258 7.48975 3.39625 7.59625C3.28975 7.70258 3.2365 7.8205 3.2365 7.95C3.2365 8.0795 3.28975 8.19742 3.39625 8.30375L6.0345 10.9423C6.19617 11.1038 6.38467 11.1845 6.6 11.1845C6.81533 11.1845 7.00383 11.1038 7.1655 10.9423L12.6423 5.4655C12.7359 5.37183 12.7859 5.25708 12.7923 5.12125C12.7988 4.98525 12.7487 4.86408 12.6423 4.75775C12.5359 4.65125 12.418 4.598 12.2885 4.598C12.159 4.598 12.041 4.65125 11.9345 4.75775L6.6 10.0922z'/%3e%3c/svg%3e");
    background-color: ${({ theme }) => theme.colors.Blue_500};
  }
`;
