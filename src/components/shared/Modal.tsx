import { ReactNode } from "react";

export interface ModalProps {
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="p-6 bg-slate-600 rounded">{props.children} </div>
    </div>
  );
};
