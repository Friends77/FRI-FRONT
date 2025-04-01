import ModalContainer from '@/utils/portal';
import * as Styled from './CustomModal.styled';
import Close from '../../SVG/Icon/Close';

interface ICustomModal {
  /** 모달 제목 */
  title: string;
  /** 모달 닫기 버튼 클릭 시 실행될 함수 */
  onClose: () => void;
  /** 모달 내부에 렌더링할 콘텐츠 */
  children: React.ReactNode;
}

const CustomModal = ({ title, onClose, children }: ICustomModal) => {
  return (
    <ModalContainer id="modal">
      <Styled.CustomModalContainer>
        <Styled.CustomModal>
          <Styled.Header>
            <Styled.Heading>{title}</Styled.Heading>
            <Styled.CloseButton type="button" onClick={onClose}>
              <Close title="닫기" width="24" height="24" />
            </Styled.CloseButton>
          </Styled.Header>
          <Styled.Content>{children}</Styled.Content>
        </Styled.CustomModal>
      </Styled.CustomModalContainer>
    </ModalContainer>
  );
};

export default CustomModal;
