import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SelectionGrid = ({
  field,
  formid,
  selected,
}: {
  field: any;
  formid: string;
  selected: boolean;
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
      {selected ? (
        <div>test</div>
      ) : (
        <>
          <div className="flex flex-row ml-32">
            {rowAnswers.map((answer: any, index) => (
              <Input
                className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center"
                type="text"
                key={index}
                value={rowAnswers[index].answerName}
                onBlur={() => {}}
                spellCheck={false}
              />
            ))}
          </div>
          <div className="flex flex-row mt-8">
            <div className="flex flex-col w-36">
              {columnAnswers.map((answer: any, index) => (
                <Input
                  className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center"
                  type="text"
                  key={index}
                  value={columnAnswers[index].answerName}
                  onBlur={() => {}}
                  spellCheck={false}
                />
              ))}
            </div>
            {columnAnswers.map((answer: any, index) => (
              <div
                className="flex flex-row w-36 justify-center align-middle"
                key={index}
              >
                {rowAnswers.map((answer: any, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="radio-1"
                    className="radio cursor-default text-gray-300"
                    style={{
                      borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                    }}
                    checked={false}
                    onChange={() => {}}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
