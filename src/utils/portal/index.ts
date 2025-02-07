import { createPortal } from 'react-dom';

interface IModalContainer {
  id: string;
  children: React.ReactNode;
}

const ModalContainer = ({ id, children }: IModalContainer) => {
  const container = document.getElementById(id);

  if (!container) {
    throw new Error(`Modal container with id "${id}" does not exist.`);
  }

  return createPortal(children, container);
};

export default ModalContainer;
