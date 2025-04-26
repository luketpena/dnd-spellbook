import clsx from "clsx";
import { ReactNode, useMemo, useRef, useState } from "react";
import Icon from "./Icon";

export interface AccordionProps {
  title: string;
  children?: ReactNode;
  openIndex?: number;
  index?: number;
  onOpenChange?: (i: number) => void;
  scrollOnOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  index,
  openIndex,
  onOpenChange,
  scrollOnOpen,
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = useMemo(() => {
    if (index != undefined && openIndex != undefined) {
      return index === openIndex;
    } else {
      return open;
    }
  }, [index, openIndex, open]);

  const marginActive = useMemo(() => {
    return openIndex === undefined ? false : isOpen;
  }, [isOpen, openIndex]);

  function handleClick() {
    if (index != undefined && openIndex != undefined && onOpenChange) {
      onOpenChange(index);
    } else {
      setOpen(!open);
    }

    if (scrollOnOpen) {
      setTimeout(() => {
        scrollIfOpen();
      }, 200);
    }
  }

  function scrollIfOpen() {
    // This works because with timeout it triggers while in the flipped state
    if (!isOpen) {
      console.log("SCROLL!");
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <div
      className={clsx(
        "overflow-hidden block w-full min-h-12 transition-all ",
        marginActive && "my-4"
      )}
      style={{
        height: isOpen
          ? `${(contentRef.current?.offsetHeight ?? 0) + 48}px`
          : "48px",
      }}
      ref={containerRef}
    >
      <button
        className="h-12 flex items-center justify-between  p-2 w-full "
        onClick={handleClick}
      >
        <p className="font-semibold">{title}</p>
        <Icon name={isOpen ? "BiChevronUp" : "BiChevronDown"} />
      </button>

      <div className="p-2 box-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
