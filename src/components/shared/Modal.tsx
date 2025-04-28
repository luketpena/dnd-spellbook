import { ReactNode } from "react";
import Icon from "./Icon";
import clsx from "clsx";

export interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
  noPadding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  title,
  noPadding,
}) => {
  if (!open) {
    return <></>;
  } else {
    return (
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className=" bg-slate-600 rounded overflow-hidden max-h-[calc(100vh-128px)] max-w-[calc(100vw-128px)] grid grid-rows-[auto_1fr]">
          {/* Header */}
          <div className="flex justify-between gap-8 text-white bg-slate-700 pl-6 pr-2 py-2 shadow-xl z-10">
            <p className="font-semibold">{title}</p>
            <button
              onClick={onClose}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Icon name="RiCloseFill" />
            </button>
          </div>
          {/* Content */}
          <div
            className={clsx(
              "overflow-x-hidden overflow-y-auto no-scrollbar",
              !noPadding && "p-6"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
};
