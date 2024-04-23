import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UpdateAnswerTitle, addNewAnswer } from "../../../../actions/dbUpdates";

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
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 text-center">
            {"Row Answers:"}
            {rowAnswers.map((answer: any, index) => (
              <Input
                className="text-md text-gray-300 border-transparent text-ellipsis w-36 text-center"
                type="text"
                key={index}
                value={rowAnswers[index].answerName}
                onChange={(e) => {
                  setRowAnswers((prev) => {
                    const newArr = [...prev];
                    newArr[index].answerName = e.target.value;
                    return newArr;
                  });
                }}
                onBlur={async () => {
                  await UpdateAnswerTitle(
                    formid,
                    field.fieldID,
                    answer.answerName,
                    answer.answerID
                  );
                }}
                spellCheck={false}
              />
            ))}
            <div
              className="cussor-pointer"
              onClick={async () => {
                setRowAnswers((prev: any) => {
                  const newArr = [...prev];
                  newArr.push({
                    answerName: "Untitled",
                    answerType: 6,
                    answerPos: newArr.length,
                  });
                  return newArr;
                });
                const answer: any = await addNewAnswer(
                  formid,
                  field.position,
                  field.fieldID,
                  columnAnswers.length - 1,
                  6
                );
                setRowAnswers(answer);
              }}
            >
              {"Click to add new row"}
            </div>
          </div>
          <div className="flex flex-col gap-4 text-center">
            {"Column Answers:"}
            {columnAnswers.map((answer: any, index) => (
              <Input
                className="text-md text-gray-300 border-transparent text-ellipsis w-36 text-center"
                type="text"
                key={index}
                value={columnAnswers[index].answerName}
                onChange={(e) => {
                  setColumnAnswers((prev) => {
                    const newArr = [...prev];
                    newArr[index].answerName = e.target.value;
                    return newArr;
                  });
                }}
                onBlur={async () => {
                  await UpdateAnswerTitle(
                    formid,
                    field.fieldID,
                    answer.answerName,
                    answer.answerID
                  );
                }}
                spellCheck={false}
              />
            ))}
            <div
              className="cussor-pointer"
              onClick={async () => {
                setColumnAnswers((prev: any) => {
                  const newArr = [...prev];
                  newArr.push({
                    answerName: "Untitled",
                    answerType: 5,
                    answerPos: newArr.length,
                  });
                  return newArr;
                });
                const answer: any = await addNewAnswer(
                  formid,
                  field.position,
                  field.fieldID,
                  columnAnswers.length - 1,
                  5
                );
                setColumnAnswers(answer);
              }}
            >
              {"Click to add new collumn"}
            </div>
          </div>
        </div>
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
            <div className="flex flex-col w-36 gap-2">
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
            <div className="flex flex-col items-center justify-between">
              {columnAnswers.map((answer: any, index) => (
                <div key={index} className="flex ml-4 flex-row py-[6px]">
                  {rowAnswers.map((answer: any, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="radio-1"
                      className="radio cursor-default text-gray-300 ml-4"
                      style={{
                        borderColor:
                          "rgb(209 213 219 / var(--tw-text-opacity))",
                      }}
                      checked={false}
                      onChange={() => {}}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
