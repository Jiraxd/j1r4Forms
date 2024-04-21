import { Input } from "@/components/ui/input";
import { useState } from "react";
import { string } from "zod";
import { UpdateAnswerTitle } from "../../../../actions/dbUpdates";

export const LinealScale = ({
  field,
  formid,
  selected,
}: {
  field: any;
  formid: string;
  selected: boolean;
}) => {
  // for some reason this does not work for 0 in the ||, it has to do something with JS thinking 0 is false after i parsed it  :)
  const [MinNumber, setMinNumber] = useState<number>(
    parseInt(
      ((field.Answers as []).find((f: any) => f.answerType === 3) as any)
        .answerName
    )
  );
  const [MaxNumber, setMaxNumber] = useState<number>(
    parseInt(
      ((field.Answers as []).find((f: any) => f.answerType === 4) as any)
        .answerName || 5
    ) || 5
  );
  const [MinTitle, setMinTitle] = useState<string>(
    ((field.Answers as []).find((f: any) => f.answerType === 1) as any)
      .answerName || "Minimum"
  );
  const [MaxTitle, setMaxTitle] = useState<string>(
    ((field.Answers as []).find((f: any) => f.answerType === 2) as any)
      .answerName || "Maximum"
  );
  return (
    <div className="px-3 flex flex-col gap-2">
      {selected ? (
        <>
          <div className="flex gap-4">
            <div className={`dropdown`}>
              <div
                tabIndex={1}
                role="button"
                className="btn bg-slate-700 text-slate-300 border-transparent"
              >
                {MinNumber}
                <div
                  className="top-[22px] right-[19px]"
                  style={{
                    borderTopColor: "rgb(128,149, 174)",
                    borderBottomColor: "rgb(128,149, 174)",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderWidth: "5px 5px 0 5px",
                  }}
                />
              </div>
              <ul
                tabIndex={1}
                className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 text-slate-300 rounded-box w-52"
              >
                {PossibleLinealMin.filter(
                  (value, index) => value != MinNumber
                ).map((answer, index) => (
                  <li
                    key={index}
                    className="cursor-pointer"
                    onClick={async () => {
                      setMinNumber(answer);
                      await UpdateAnswerTitle(
                        formid,
                        field.fieldID,
                        answer.toString(),
                        (
                          (field.Answers as []).find(
                            (f: any) => f.answerType === 3
                          ) as any
                        ).answerID
                      );
                    }}
                  >
                    <a>{answer}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center">{"to"}</div>
            <div className={`dropdown`}>
              <div
                tabIndex={1}
                role="button"
                className="btn bg-slate-700 text-slate-300 border-transparent"
              >
                {MaxNumber}
                <div
                  className="top-[22px] right-[19px]"
                  style={{
                    borderTopColor: "rgb(128,149, 174)",
                    borderBottomColor: "rgb(128,149, 174)",
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderWidth: "5px 5px 0 5px",
                  }}
                />
              </div>
              <ul
                tabIndex={1}
                className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 text-slate-300 rounded-box w-52"
              >
                {PossibleLinealMax.filter(
                  (value, index) => value != MaxNumber
                ).map((answer, index) => (
                  <li
                    key={index}
                    className="cursor-pointer"
                    onClick={async () => {
                      setMaxNumber(answer);
                      await UpdateAnswerTitle(
                        formid,
                        field.fieldID,
                        answer.toString(),
                        (
                          (field.Answers as []).find(
                            (f: any) => f.answerType === 4
                          ) as any
                        ).answerID
                      );
                    }}
                  >
                    <a>{answer}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center">
              <div className=" max-w-[18px] min-w-[18px]">{MinNumber}</div>
              <Input
                className="text-lg text-slate-300 border-transparent w-fit ml-4"
                type="text"
                value={MinTitle}
                onChange={(e) => setMinTitle(e.target.value)}
                onBlur={async () => {
                  await UpdateAnswerTitle(
                    formid,
                    field.fieldID,
                    MinTitle,
                    (
                      (field.Answers as []).find(
                        (f: any) => f.answerType === 1
                      ) as any
                    ).answerID
                  );
                }}
                spellCheck={false}
              />
            </div>
            <div className="flex items-center">
              <div className="max-w-[18px] min-w-[18px]">{MaxNumber}</div>
              <Input
                className="text-lg text-slate-300 border-transparent w-fit ml-4"
                type="text"
                value={MaxTitle}
                onChange={(e) => setMaxTitle(e.target.value)}
                onBlur={async () => {
                  await UpdateAnswerTitle(
                    formid,
                    field.fieldID,
                    MaxTitle,
                    (
                      (field.Answers as []).find(
                        (f: any) => f.answerType === 2
                      ) as any
                    ).answerID
                  );
                }}
                spellCheck={false}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row gap-6">
          <div className="flex items-end">{MinTitle}</div>
          {Array(MaxNumber + 1 - MinNumber)
            .fill("x")
            .map((value, index) => (
              <div className="flex flex-col items-center" key={index}>
                <div>{MinNumber === 0 ? index : index + 1}</div>
                <input
                  type="radio"
                  name="radio-1"
                  className="radio cursor-default"
                  style={{
                    borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                  }}
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            ))}
          <div className="flex items-end">{MaxTitle}</div>
        </div>
      )}
    </div>
  );
};

const PossibleLinealMin = [0, 1];
const PossibleLinealMax = [2, 3, 4, 5, 6, 7, 8, 9, 10];
