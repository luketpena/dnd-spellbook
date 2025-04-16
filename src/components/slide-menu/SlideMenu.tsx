import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon, { IconName } from "../shared/Icon";
import { useClickOutside } from "../../hooks/ClickOutside";

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
  icon: IconName;
}

export const SlideMenu: React.FC<SlideMenuProps> = ({ buttons, icon }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [maxContentWidth, setMaxContentWidth] = useState(0);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);

  useClickOutside(menuRef, () => setOpen(false));

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

  function handleMenuButtonClick(
    e: React.MouseEvent,
    button: SlideMenuButton,
    index: number
  ) {
    e.stopPropagation();
    if ((button.dropdownOptions?.length ?? 0) > 0) {
      setOpenDropdownIndex(openDropdownIndex === index ? -1 : index);
    } else if (button.action) {
      button.action();
    }
  }

  function handleOptionSelect(
    e: React.MouseEvent,
    button: SlideMenuButton,
    value: any
  ) {
    e.stopPropagation();
    if (!button.action) return;
    button.action(value);
  }

  function clickToggle(e: React.MouseEvent) {
    e.stopPropagation();
    setOpen(!open);
    setOpenDropdownIndex(-1);
  }

  function closeMenu() {
    setOpen(false);
    setOpenDropdownIndex(-1);
  }

  return (
    <div className="relative h-16" ref={containerRef} onClick={closeMenu}>
      <div
        ref={menuRef}
        className={clsx(
          "text-white h-16 text-nowrap transition-all overflow-x-hidden flex",
          open ? "overflow-y-visible" : "overflow-y-hidden"
        )}
        style={{
          width: open ? `${maxContentWidth}px` : `64px`,
          height: open ? `${maxHeight * 64}px` : "64px",
        }}
      >
        {/* Toggle Button */}
        <button
          className="min-h-16 min-w-16 h-16 flex items-center justify-center transition-colors bg-gray-700 hover:bg-gray-600"
          onClick={(e) => clickToggle(e)}
        >
          <Icon name={icon} size={40} />
        </button>

        {/* Menu Buttons */}
        {buttons.map((button, index) => (
          <button
            key={`slide-menu-button-${index}`}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            className="flex items-center relative bg-gray-700 hover:bg-gray-600 h-16  "
            onClick={(e) => handleMenuButtonClick(e, button, index)}
          >
            <span className="flex flex-col">
              <span className="px-4">{button.text}</span>
              {(button.dropdownOptions ?? []).length > 0 && (
                <span className="text-orange-400 text-xs font-semibold capitalize">
                  {button.dropdownValue}
                </span>
              )}
            </span>

            {/* Dropdown menu */}
            {openDropdownIndex === index &&
              (button.dropdownOptions ?? []).length > 0 && (
                <div className="absolute w-full top-16">
                  {button.dropdownOptions?.map((option, indexOption) => (
                    <div
                      key={`button-${index}-${option}-${indexOption}`}
                      className={clsx(
                        "w-full h-16 flex items-center px-4",
                        button.dropdownValue === option.value
                          ? "bg-gray-900 text-orange-600"
                          : "bg-gray-800 hover:bg-gray-700"
                      )}
                      onClick={(e) =>
                        handleOptionSelect(e, button, option.value)
                      }
                    >
                      <span>{option.text}</span>
                    </div>
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
