import { useState } from "react";

export const RadioAnswerView = ({
  answer,
  field,
}: {
  answer: any;
  field: any;
}) => {
  const [answers, setTitle] = useState<string[]>(
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
      {answers.map((answerx: any, index: number) => {
        return (
          <div className="flex items-center" key={index}>
            <div className="form-control">
              <label className="label">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio cursor-default"
                  style={{
                    borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                  }}
                  checked={answer === answerx.answerID}
                  onChange={() => {}}
                />
              </label>
            </div>
            <div className="text-md text-gray-300 border-transparent ml-4">
              {answerx.answerName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
