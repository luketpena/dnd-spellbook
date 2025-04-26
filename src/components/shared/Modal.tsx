import { ReactNode } from "react";
import Icon from "./Icon";

export interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  title,
}) => {
  if (!open) {
    return <></>;
  } else {
    return (
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className=" bg-slate-600 rounded overflow-y-auto overflow-x-hidden max-h-[calc(100vh-128px)] max-w-[calc(100vw-128px)] no-scrollbar">
          {/* Header */}
          <div className="flex justify-between gap-8 text-white bg-slate-700 pl-6 pr-2 py-2">
            <p className="font-semibold">{title}</p>
            <button
              onClick={onClose}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Icon name="RiCloseFill" />
            </button>
          </div>
          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }
};
