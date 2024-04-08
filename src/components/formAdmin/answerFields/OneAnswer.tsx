import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UpdateAnswerTitle, addNewAnswer } from "../../../../actions/dbUpdates";
import { db } from "@/lib/db";

export const RadioButtons = ({
  field,
  formid,
}: {
  field: any;
  formid: string;
}) => {
  const [answers, setAnswers] = useState<any>(
    field.Answers.toSorted((a: any, b: any) => {
      if ((a as any).answerPos < (b as any).answerPos) {
        return -1;
      }
      if ((a as any).answerPos > (b as any).answerPos) {
        return 1;
      }
      return 0;
    })
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
                  type="radio"
                  name="radio-1"
                  className="radio cursor-default"
                  checked={false}
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
                  field.position,
                  field.fieldID,
                  answerTitles[index],
                  answers[index].answerID
                );
              }}
              spellCheck={false}
            />
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
            answers.length
          );
          setAnswers(answer);
        }}
      >
        <input
          type="radio"
          name="radio-1"
          className="radio"
          checked={false}
          onChange={() => {}}
        />
        <span className="ml-8">Click to add new option</span>
      </div>
    </div>
  );
};
