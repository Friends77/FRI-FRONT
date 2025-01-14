import ArrowDown from '@/components/@common/SVG/Icon/ArrowDown';
import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 0 24px;
  overflow-y: auto;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
`;

export const Text = styled.p`
  ${({ theme }) => theme.typo.B1_B};
  color: ${({ theme }) => theme.colors.Gray_800};
`;

export const MoreBtn = styled.button`
  width: 30px;
  height: 30px;
`;

export const MoreIcon = styled(ArrowDown)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => $isOpen && 'rotateX(180deg);'};
  transition: 0.3s transform ease;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;
