import { ReactNode } from "react";

interface ModalWrapperProps {
  children: ReactNode;
  isModalOpen: boolean;
}

export function ModalWrapper({ children, isModalOpen }: ModalWrapperProps) {
  return (
    <div className={`z-40 transition-all duration-150 flex items-center justify-center fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] ${isModalOpen ? "visible opacity-100 pointer-events-auto" : "pointer-events-none invisible opacity-0"}`}>
      {children}
    </div>
  );
}
