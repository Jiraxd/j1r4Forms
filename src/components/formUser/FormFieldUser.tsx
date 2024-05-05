import { FieldValues, UseFormRegister } from "react-hook-form";
import { NumberAnswerUser } from "./NumberAnswer";
import { TextAnswerUser } from "./TextAnwer";
import { DateAnswerUser } from "./DateAnswerUser";
import { TimeAnswerUser } from "./TimeAnswerUser";

export const FormFieldUser = ({
  field,
  register,
}: {
  field: any;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <div className="flex rounded-lg flex-col w-full bg-slate-600 min-w-[770px] max-w-[770px] ">
      {field.fieldAnswerType === 0 && (
        <div className="w-full p-6 pt-2 pb-6">
          <TextAnswerUser field={field} register={register} />
        </div>
      )}
      {field.fieldAnswerType === 1 && (
        <div className="w-full p-6 pt-2 pb-6">
          <NumberAnswerUser field={field} register={register} />
        </div>
      )}
      {field.fieldAnswerType === 2 && (
        <div className="w-full p-6 pt-2 pb-6">
          <DateAnswerUser field={field} register={register} />
        </div>
      )}
      {field.fieldAnswerType === 3 && (
        <div className="w-full p-6 pt-2 pb-6">
          <TimeAnswerUser field={field} register={register} />
        </div>
      )}
      {field.fieldAnswerType === 4 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<RadioButtons field={field} />"}
        </div>
      )}
      {field.fieldAnswerType === 5 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<CheckboxAnswer field={field} />"}
        </div>
      )}
      {field.fieldAnswerType === 6 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<LinealScale  field={field}  />"}
        </div>
      )}
      {field.fieldAnswerType === 7 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<SelectionGrid  field={field} />"}
        </div>
      )}
    </div>
  );
};
