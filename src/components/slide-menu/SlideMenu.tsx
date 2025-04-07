import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon, { IconName } from "../shared/Icon";

export interface SlideMenuButton<T = any> {
  text: string;
  icon?: IconName;
  action?: (v?: T) => void;
  dropdownOptions?: SlideMenuDropdownOption<T>[];
  dropdownValue?: T;
}

export interface SlideMenuDropdownOption<T = any> {
  text: string;
  value: T;
}

export interface SlideMenuProps {
  buttons: SlideMenuButton[];
}

export const SlideMenu: React.FC<SlideMenuProps> = ({ buttons }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [maxContentWidth, setMaxContentWidth] = useState(0);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);

  useEffect(() => {
    setMaxContentWidth(menuRef.current?.scrollWidth ?? 0);
  }, [menuRef.current]);

  const maxHeight = useMemo(() => {
    return (
      1 +
      buttons.reduce((maxLength, button) => {
        return Math.max(maxLength, (button.dropdownOptions ?? []).length);
      }, 0)
    );
  }, [buttons]);

  function handleMenuButtonClick(button: SlideMenuButton, index: number) {
    if ((button.dropdownOptions?.length ?? 0) > 0) {
      setOpenDropdownIndex(openDropdownIndex === index ? -1 : index);
    } else if (button.action) {
      button.action();
    }
  }

  function handleOptionSelect(button: SlideMenuButton, value: any) {
    if (!button.action) return;
    button.action(value);
  }

  return (
    <div className="relative">
      <div
        ref={menuRef}
        className={clsx(
          "text-white  h-16 text-nowrap transition-all overflow-x-hidden overflow-y-visible flex"
        )}
        style={{
          width: open ? `${maxContentWidth}px` : `64px`,
          height: `${maxHeight * 64}px`,
        }}
      >
        {/* Toggle Button */}
        <button
          className="min-h-16 min-w-16 h-16 flex items-center justify-center hover:bg-white/5 transition-colors bg-gray-700"
          onClick={() => setOpen(!open)}
        >
          <Icon name="BiSortAlt2" size={40} />
        </button>

        {/* Menu Buttons */}
        {buttons.map((button, index) => (
          <button
            key={`slide-menu-button-${index}`}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            className="flex items-center relative bg-gray-700 h-16  "
            onClick={() => handleMenuButtonClick(button, index)}
          >
            <span className="px-4">{button.text}</span>

            {/* Dropdown menu */}
            {openDropdownIndex === index &&
              (button.dropdownOptions ?? []).length > 0 && (
                <div className="absolute w-full top-16">
                  {button.dropdownOptions?.map((option, indexOption) => (
                    <button
                      key={`button-${index}-${option}-${indexOption}`}
                      className="w-full bg-gray-800 h-16 flex items-center px-4"
                      onClick={() => handleOptionSelect(button, option.value)}
                    >
                      <span>{option.text}</span>
                    </button>
                  ))}
                </div>
              )}
          </button>
        ))}
      </div>

      {/* Dropdown menu */}
      {/* {openDropdownIndex >= 0 && (
        <div
          className="absolute bg-red-500 h-16 w-16 top-16"
          style={{ left: `${dropdownLeft}px`, width: `${dropdownWidth}px` }}
        ></div>
      )} */}
    </div>
  );
};
