import { useFormContext } from "react-hook-form";

export interface InputTextProp {
  name: string;
}

export const InputText: React.FC<InputTextProp> = ({ name }) => {
  const { register } = useFormContext();

  return (
    <input
      type="text"
      {...register(name)}
      className="border rounded border-blue-500"
    />
  );
};
