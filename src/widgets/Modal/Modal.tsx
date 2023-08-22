import React, { useRef } from "react";
import { GrClose } from "react-icons/gr";

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  width: string;
}

export const Modal: React.FC<ModalProps> = ({
  modal,
  setModal,
  children,
  title,
  width,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className={`overlay  ${modal ? "open" : ""}`}
    >
      <div className={`w-[${width}] modal_wrapper `}>
        <button
          onClick={() => setModal(false)}
          className={`btn btn-dark modal_button  rounded-0`}
        >
          <GrClose size={20} />
        </button>
        <div className={` modal_header`}>
          <h3 className="font-semibold text-[30px]">{title}</h3>
        </div>
        <div className={`modal-content`}>{children}</div>
      </div>
    </div>
  );
};
