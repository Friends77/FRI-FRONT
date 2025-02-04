import ModalContainer from '@/utils/portal';
import * as Styled from './CustomModal.styled';
import Close from '../../SVG/Icon/Close';

interface ICustomModal {
  title: string;
  onClose: () => void;
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
