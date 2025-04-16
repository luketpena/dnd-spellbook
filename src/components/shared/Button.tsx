import clsx from "clsx";
import { useLongPress } from "use-long-press";

export interface ButtonProps {
  text?: string;
  onClick?: () => void;
  onMouseUp?: () => void;
  disabled?: boolean;
  onLongPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  onMouseUp,
  onLongPress,
  disabled,
}) => {
  const longPressHandlers = useLongPress(
    () => {
      console.log("long pressed!");
      if (onLongPress) {
        onLongPress();
      }
    },
    {
      threshold: 500, // ms before "long press" fires, default is 500
      captureEvent: true,
      cancelOnMovement: true,
    }
  );
  return (
    <button
      {...longPressHandlers()}
      className={clsx(
        "text-white bg-orange-700 h-12 px-6 rounded font-semibold",
        disabled && "opacity-50"
      )}
      onClick={onClick}
      onMouseUp={onMouseUp}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
