import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export interface InputProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
  name: string;
  required?: boolean | string;
  min?: number;
}

export const Input: React.FC<InputProps> = ({
  type,
  className,
  name,
  required,
  min,
}) => {
  const { register } = useFormContext();

  return (
    <input
      {...register(name, { required, min, valueAsNumber: type === "number" })}
      className={clsx(
        "bg-slate-800 rounded h-12 text-white px-2 text-xl",
        className
      )}
      type={type}
    />
  );
};
