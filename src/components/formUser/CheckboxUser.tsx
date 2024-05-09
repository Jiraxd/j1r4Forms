import { useState } from "react";

export const CheckboxesUser = ({
  field,
  register,
}: {
  field: any;
  register: any;
}) => {
  const [answers, setAnswers] = useState<any>(
    field.Answers.filter((f: any) => f.answerType === 0).toSorted(
      (a: any, b: any) => {
        if ((a as any).answerPos < (b as any).answerPos) {
          return -1;
        }
        if ((a as any).answerPos > (b as any).answerPos) {
          return 1;
        }
        return 0;
      }
    )
  );
  return (
    <div className="px-3">
      {answers.map((answer: any, index: number) => {
        return (
          <div className="flex items-center" key={answer.answerName + index}>
            <div className="form-control">
              <label className="label">
                <input
                  type="checkbox"
                  name="checkbox-1"
                  className="checkbox cursor-default"
                  {...register(
                    (field.fieldID as number).toString() +
                      "-" +
                      (answer.answerID as number).toString()
                  )}
                  style={{
                    borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                  }}
                />
              </label>
            </div>
            <div className="text-md text-gray-300 border-transparent ml-4">
              {answer.answerName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
