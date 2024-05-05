import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

export const NumberAnswerUser = ({
  field,
  register,
}: {
  field: any;
  register: any;
}) => {
  return (
    <div className="px-3">
      <Input
        type="number"
        className="text-md text-gray-300"
        placeholder="Number answer..."
        {...register((field.fieldID as number).toString())}
      />
      <p className="pt-2 border-b-1 border-dotted border-gray-400" />
    </div>
  );
};
