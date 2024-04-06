import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  UpdateFieldAnswerType,
  fieldUpdateTitle,
} from "../../../../actions/dbUpdates";
import { TextAnswer } from "../answerFields/textAnswer";
import { NumberAnswer } from "../answerFields/numberAnswer";

export const FormField = ({
  field,
  selected,
  formid,
  callback,
  indexForm,
}: {
  field: any;
  selected: boolean;
  formid: string;
  callback: Function;
  indexForm: number;
}) => {
  const [fieldTitle, setTitle] = useState<string>(field.fieldTitle);
  const [fieldAnswerType, setAnswerType] = useState<number>(
    field.fieldAnswerType
  );
  const handleNameChange = async () => {
    if (fieldTitle === field.fieldTitle) return;
    await fieldUpdateTitle(formid, field.fieldID, fieldTitle);
  };
  return (
    <div className="flex rounded-lg flex-col w-full bg-slate-600 min-w-[770px]">
      <div className="w-full p-6 py-4 flex justify-between">
        <Input
          className="text-xl font-bold text-slate-300 border-transparent w-fit"
          type="text"
          value={fieldTitle}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleNameChange()}
          spellCheck={false}
        />
        <div
          className={`dropdown dropdown-end opacity-${
            selected ? "100" : "0"
          } transition-opacity duration-300 ease-in-out`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn bg-slate-700 text-slate-300 border-transparent"
          >
            {getAnswerType(fieldAnswerType)}
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
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 text-slate-300 rounded-box w-52"
          >
            {answerList
              .filter((value, index) => index != fieldAnswerType)
              .map((answer, index) => (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={async () => {
                    let indexAnswerList = answerList.findIndex(
                      (value) => value === answer
                    );
                    callback(indexForm, indexAnswerList);
                    setAnswerType(indexAnswerList);
                    await UpdateFieldAnswerType(
                      formid,
                      field.position,
                      indexAnswerList,
                      field.fieldID
                    );
                  }}
                >
                  <a>{answer}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {fieldAnswerType === 0 && (
        <div className="w-full p-6 pt-2 pb-6">
          <TextAnswer formid={formid} field={field} />
        </div>
      )}
      {fieldAnswerType === 1 && (
        <div className="w-full p-6 pt-2 pb-6">
          <NumberAnswer formid={formid} field={field} />
        </div>
      )}
    </div>
  );
};

const answerList = ["Text Answer", "Number Answer"];

const getAnswerType = (answerIndex: number) => {
  return answerList[answerIndex];
};
