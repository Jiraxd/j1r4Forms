import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  UpdateAnswerTitle,
  addNewAnswer,
  removeAnswer,
} from "../../../../actions/dbUpdates";
import { db } from "@/lib/db";

export const CheckboxAnswer = ({
  field,
  formid,
}: {
  field: any;
  formid: string;
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
  const [answerTitles, setTitle] = useState<string[]>(
    field.Answers.toSorted((a: any, b: any) => {
      if ((a as any).answerPos < (b as any).answerPos) {
        return -1;
      }
      if ((a as any).answerPos > (b as any).answerPos) {
        return 1;
      }
      return 0;
    }).map((answer: any) => answer.answerName)
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
                  className="checkbox cursor-default"
                  checked={false}
                  style={{
                    borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                  }}
                  onChange={() => {}}
                />
              </label>
            </div>
            <Input
              className="text-md text-gray-300 border-transparent ml-4"
              type="text"
              value={answerTitles[index]}
              onChange={(e) => {
                setTitle((prev) => {
                  const newArr = [...prev];
                  newArr[index] = e.target.value;
                  return newArr;
                });
              }}
              onBlur={async () => {
                await UpdateAnswerTitle(
                  formid,
                  field.fieldID,
                  answerTitles[index],
                  answers[index].answerID
                );
              }}
              spellCheck={false}
            />
            <div
              className="flex cursor-pointer"
              onClick={async () => {
                setTitle((prev) => {
                  const newarr = [...prev];
                  const newArr = newarr.filter((_, indexx) => indexx !== index);
                  return newArr;
                });
                setAnswers((prev: any) => {
                  const newarr = [...prev];
                  const newArr = newarr.filter(
                    (_: any, indexx: any) => indexx !== index
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
        );
      })}
      <div
        className="flex items-center mt-2 ml-1 cursor-pointer"
        onClick={async () => {
          setTitle((prev) => {
            const newArr = [...prev];
            newArr.push("Untitled Option");
            return newArr;
          });
          setAnswers((prev: any) => {
            const newArr = [...prev];
            newArr.push({
              answerName: "Untitled Option",
              answerType: 1,
              answerPos: answers.length,
            });
            return newArr;
          });
          const answer = await addNewAnswer(
            formid,
            field.position,
            field.fieldID,
            answers.length,
            0
          );
          setAnswers(answer);
        }}
      >
        <input
          type="checkbox"
          className="checkbox"
          style={{
            borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
          }}
          checked={false}
          onChange={() => {}}
        />
        <span className="ml-8">Click to add new option</span>
      </div>
    </div>
  );
};
