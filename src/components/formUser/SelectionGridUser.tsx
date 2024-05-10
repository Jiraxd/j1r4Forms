import { useState } from "react";

export const SelectionGridUser = ({
  field,
  register,
}: {
  field: any;
  register: any;
}) => {
  const [rowAnswers, setRowAnswers] = useState<any[]>(
    (field.Answers as [])
      .filter((f: any) => f.answerType === 6)
      .toSorted((a: any, b: any) => {
        if ((a as any).answerPos < (b as any).answerPos) {
          return -1;
        }
        if ((a as any).answerPos > (b as any).answerPos) {
          return 1;
        }
        return 0;
      })
  );
  const [columnAnswers, setColumnAnswers] = useState<any[]>(
    (field.Answers as [])
      .filter((f: any) => f.answerType === 5)
      .toSorted((a: any, b: any) => {
        if ((a as any).answerPos < (b as any).answerPos) {
          return -1;
        }
        if ((a as any).answerPos > (b as any).answerPos) {
          return 1;
        }
        return 0;
      })
  );
  return (
    <div className="px-3">
      <div className="overflow-auto">
        <div className="flex flex-row ml-32">
          {rowAnswers.map((answer: any, index) => (
            <div
              className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center"
              key={answer.answerName + index}
            >
              {rowAnswers[index].answerName}
            </div>
          ))}
        </div>
        <div className="flex flex-row mt-8 pb-4">
          <div className="flex flex-col w-36 gap-2">
            {columnAnswers.map((answer: any, index) => (
              <div
                className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center h-9 py-2"
                key={answer.answerName + index}
              >
                {columnAnswers[index].answerName}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between">
            {columnAnswers.map((answer: any, indexx) => (
              <div key={indexx} className="flex flex-row py-[6px]">
                {rowAnswers.map((answer: any, index) => (
                  <input
                    key={index}
                    type="radio"
                    value={index}
                    {...register(
                      (field.fieldID as number).toString() + "-" + indexx
                    )}
                    className={`radio cursor-default text-gray-300 ml-[60px] mr-[76px]`}
                    style={{
                      borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
