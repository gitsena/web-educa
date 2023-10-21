import React from 'react';
import style from './modal.module.scss';
import { ReactNode } from 'react';

type Props = {
  isBottomless?: boolean;
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ isOpen, onClose, children, isBottomless }: Props) => {
  const overlayRef = React.useRef(null);

  const handleOverlaClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    <div
      className={`${isBottomless ? style.bottomless : style.container}`}
      ref={overlayRef}
      onClick={handleOverlaClick}
    >
      {children}
    </div>
  ) : null;
};
