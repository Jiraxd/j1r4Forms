import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  UpdateAnswerTitle,
  addNewAnswer,
  removeAnswer,
} from "../../../../actions/dbUpdates";

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
  console.log(rowAnswers);
  console.log(columnAnswers);
  return (
    <div className="px-3">
      {selected ? (
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 text-center items-center">
            {"Row Answers:"}
            {rowAnswers.map((answer: any, index) => (
              <div className="flex justify-between items-center" key={index}>
                <Input
                  className="text-md text-gray-300 border-transparent text-ellipsis w-36 text-center"
                  type="text"
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
                <div
                  className="flex cursor-pointer"
                  onClick={async () => {
                    setRowAnswers((prev) => {
                      const newarr = [...prev];
                      const newArr = newarr.filter(
                        (_, indexx) => indexx !== index
                      );
                      return newArr;
                    });
                    removeAnswer(
                      formid,
                      field.fieldID,
                      answer.answerPos,
                      answer.answerID
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#af6368"
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    ></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                  </svg>
                </div>
              </div>
            ))}
            {rowAnswers.length < 8 ? (
              <div
                className="cursor-pointer"
                onClick={async () => {
                  setRowAnswers((prev: any) => {
                    const newArr = [...prev];
                    newArr.push({
                      answerName: "Untitled",
                      answerType: 6,
                      answerPos:
                        rowAnswers[rowAnswers.length - 1].answerPos + 1,
                    });
                    return newArr;
                  });
                  const answer: any = await addNewAnswer(
                    formid,
                    field.position,
                    field.fieldID,
                    rowAnswers[rowAnswers.length - 1].answerPos + 1,
                    6
                  );
                  setRowAnswers(answer);
                }}
              >
                {"Click to add new row"}
              </div>
            ) : (
              <div>You cannot add more rows!</div>
            )}
          </div>
          <div className="flex flex-col gap-4 text-center items-center">
            {"Column Answers:"}
            {columnAnswers.map((answer: any, index) => (
              <div className="flex justify-between" key={index}>
                <Input
                  className="text-md text-gray-300 border-transparent text-ellipsis w-36 text-center"
                  type="text"
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
                <div
                  className="flex cursor-pointer"
                  onClick={async () => {
                    setColumnAnswers((prev) => {
                      const newarr = [...prev];
                      const newArr = newarr.filter(
                        (_, indexx) => indexx !== index
                      );
                      return newArr;
                    });
                    removeAnswer(
                      formid,
                      field.fieldID,
                      answer.answerPos,
                      answer.answerID
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#af6368"
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    ></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                  </svg>
                </div>
              </div>
            ))}
            {columnAnswers.length < 8 ? (
              <div
                className="cursor-pointer"
                onClick={async () => {
                  setColumnAnswers((prev: any) => {
                    const newArr = [...prev];
                    newArr.push({
                      answerName: "Untitled",
                      answerType: 5,
                      answerPos:
                        columnAnswers[columnAnswers.length - 1].answerPos + 1,
                    });
                    return newArr;
                  });
                  const answer: any = await addNewAnswer(
                    formid,
                    field.position,
                    field.fieldID,
                    columnAnswers[columnAnswers.length - 1].answerPos + 1,
                    5
                  );
                  setColumnAnswers(answer);
                }}
              >
                {"Click to add new collumn"}
              </div>
            ) : (
              <div>You cannot add more columns!</div>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-auto">
          <div className="flex flex-row ml-32">
            {rowAnswers.map((answer: any, index) => (
              <Input
                className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center"
                type="text"
                key={index}
                value={rowAnswers[index].answerName}
                onBlur={() => {}}
                onChange={() => {}}
                spellCheck={false}
              />
            ))}
          </div>
          <div className="flex flex-row mt-8 pb-4">
            <div className="flex flex-col w-36 gap-2">
              {columnAnswers.map((answer: any, index) => (
                <Input
                  className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center"
                  type="text"
                  key={index}
                  value={columnAnswers[index].answerName}
                  onBlur={() => {}}
                  onChange={() => {}}
                  spellCheck={false}
                />
              ))}
            </div>
            <div className="flex flex-col items-center justify-between">
              {columnAnswers.map((answer: any, index) => (
                <div key={index} className="flex flex-row py-[6px]">
                  {rowAnswers.map((answer: any, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="radio-1"
                      className={`radio cursor-default text-gray-300 ml-[60px] mr-[76px]`}
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
        </div>
      )}
    </div>
  );
};
