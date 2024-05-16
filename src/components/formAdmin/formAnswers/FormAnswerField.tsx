import { DateAnswerView } from "./DateAnswerView";
import { NumberAnswerView } from "./NumberAnswerView";
import { TextAnswerView } from "./TextAnswerView";
import { TimeAnswerView } from "./TimeAnswerView";

export const FormAnswerField = ({
  field,
  answers,
}: {
  field: any;
  answers: any;
}) => {
  console.log(answers);
  return (
    <div className="flex rounded-lg flex-col w-full bg-slate-600 min-w-[770px] max-w-[770px] ">
      <div className="w-full p-6 py-4 flex justify-between">
        <div className="text-xl font-bold text-slate-300 border-transparent w-fit ml-3">
          {field.fieldTitle}
        </div>
      </div>
      {field.fieldAnswerType === 0 && (
        <div className="w-full p-6 pt-2 pb-6">
          <TextAnswerView answer={answers.answer[field.fieldID]} />
        </div>
      )}
      {field.fieldAnswerType === 1 && (
        <div className="w-full p-6 pt-2 pb-6">
          <NumberAnswerView answer={answers.answer[field.fieldID]} />
        </div>
      )}
      {field.fieldAnswerType === 2 && (
        <div className="w-full p-6 pt-2 pb-6">
          <DateAnswerView answer={answers.answer[field.fieldID]} />
        </div>
      )}
      {field.fieldAnswerType === 3 && (
        <div className="w-full p-6 pt-2 pb-6">
          <TimeAnswerView answer={answers.answer[field.fieldID]} />
        </div>
      )}
    </div>
  );
};
