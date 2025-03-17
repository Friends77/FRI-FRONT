import ModalContainer from '@/utils/portal';
import * as Styled from './ConfirmModal.styled';
import Close from '../../SVG/Icon/Close';
import PrimaryButton from '../../Button/PrimaryButton';
import useLockBodyScroll from '@/hooks/@common/useLockBodyScroll';

interface IConfirmModal {
  /** 모달 제목 */
  title: string;
  /** 모달 설명 또는 추가 내용 (문자열 또는 React 노드) */
  description?: string | React.ReactNode;
  /** 확인 버튼 텍스트 (기본값: '확인') */
  confirmButtonText?: string;
  /** 취소 버튼 텍스트 (기본값: '취소') */
  cancelButtonText?: string;
  /** 확인 버튼 클릭 시 실행될 함수 */
  onConfirm: () => void;
  /** 취소 버튼 클릭 시 실행될 함수 */
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
            <Styled.CancelButton type="button" onClick={onCancel}>
              {cancelButtonText || '취소'}
            </Styled.CancelButton>
            <PrimaryButton type="button" onClick={onConfirm}>
              {confirmButtonText || '확인'}
            </PrimaryButton>
          </Styled.ButtonContainer>
        </Styled.ConfirmModal>
      </Styled.ConfirmModalContainer>
    </ModalContainer>
  );
};

export default ConfirmModal;
