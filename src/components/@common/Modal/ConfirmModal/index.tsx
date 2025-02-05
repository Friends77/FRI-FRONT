import ModalContainer from '@/utils/portal';
import * as Styled from './ConfirmModal.styled';
import Close from '../../SVG/Icon/Close';
import PrimaryButton from '../../Button/PrimaryButton';
import useLockBodyScroll from '@/hooks/@common/useLockBodyScroll';

interface IConfirmModal {
  title: string;
  description?: string | React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  description,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: IConfirmModal) => {
  useLockBodyScroll();

  return (
    <ModalContainer id="modal">
      <Styled.ConfirmModalContainer>
        <Styled.ConfirmModal>
          <Styled.Header>
            <Styled.Heading>{title}</Styled.Heading>
            <Styled.CloseButton type="button" onClick={onCancel}>
              <Close title="닫기" width="24" height="24" />
            </Styled.CloseButton>
          </Styled.Header>
          <Styled.Content>
            <Styled.Description>{description}</Styled.Description>
          </Styled.Content>
          <Styled.ButtonContainer>
            <Styled.CancelButton onClick={onCancel}>
              {cancelButtonText || '취소'}
            </Styled.CancelButton>
            <PrimaryButton onClick={onConfirm}>
              {confirmButtonText || '확인'}
            </PrimaryButton>
          </Styled.ButtonContainer>
        </Styled.ConfirmModal>
      </Styled.ConfirmModalContainer>
    </ModalContainer>
  );
};

export default ConfirmModal;
