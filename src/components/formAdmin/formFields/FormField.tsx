import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  UpdateFieldAnswerType,
  fieldUpdateTitle,
} from "../../../../actions/dbUpdates";
import { TextAnswer } from "../answerFields/textAnswer";
import { NumberAnswer } from "../answerFields/numberAnswer";
import { DateAnswer } from "../answerFields/dateAnswer";
import { TimeAnswer } from "../answerFields/timeAnswer";
import { RadioButtons } from "../answerFields/OneAnswer";
import { CheckboxAnswer } from "../answerFields/CheckboxAnswer";
import React from "react";
import { saveImageServer } from "../../../../actions/saveImageServer";
import { LinealScale } from "../answerFields/linealScale";
import { SelectionGrid } from "../answerFields/SelectionGrid";

export const FormField = ({
  field,
  selected,
  formid,
  callback,
  indexForm,
  callbackPosition,
}: {
  field: any;
  selected: boolean;
  formid: string;
  callback: Function;
  indexForm: number;
  callbackPosition: Function;
}) => {
  const [fieldTitle, setTitle] = useState<string>(field.fieldTitle);
  const [fieldAnswerType, setAnswerType] = useState<number>(
    field.fieldAnswerType
  );
  const handleNameChange = async () => {
    if (fieldTitle === field.fieldTitle) return;
    await fieldUpdateTitle(formid, field.fieldID, fieldTitle);
  };
  useEffect(() => {
    setTitle(field.fieldTitle);
    setAnswerType(field.fieldAnswerType);
  }, [field.fieldTitle, field.fieldAnswerType]);
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
        <div className="flex gap-2">
          <div
            className={`btn bg-slate-700 text-slate-300 border-transparent opacity-${
              selected ? "100" : "0"
            } transition-opacity duration-300 ease-in-out`}
            onClick={() => callbackPosition(field.position, false)}
          >
            ↑
          </div>
          <div
            className={`btn bg-slate-700 text-slate-300 border-transparent opacity-${
              selected ? "100" : "0"
            } transition-opacity duration-300 ease-in-out`}
            onClick={() => callbackPosition(field.position, true)}
          >
            ↓
          </div>
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
                      callback(field.position, indexAnswerList);
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
      {fieldAnswerType === 2 && (
        <div className="w-full p-6 pt-2 pb-6">
          <DateAnswer formid={formid} field={field} />
        </div>
      )}
      {fieldAnswerType === 3 && (
        <div className="w-full p-6 pt-2 pb-6">
          <TimeAnswer formid={formid} field={field} />
        </div>
      )}
      {fieldAnswerType === 4 && (
        <div className="w-full p-6 pt-2 pb-6">
          <RadioButtons formid={formid} field={field} />
        </div>
      )}
      {fieldAnswerType === 5 && (
        <div className="w-full p-6 pt-2 pb-6">
          <CheckboxAnswer formid={formid} field={field} />
        </div>
      )}
      {fieldAnswerType === 6 && (
        <div className="w-full p-6 pt-2 pb-6">
          <LinealScale formid={formid} field={field} selected={selected} />
        </div>
      )}
            {fieldAnswerType === 7 && (
        <div className="w-full p-6 pt-2 pb-6">
          <SelectionGrid formid={formid} field={field} selected={selected} />
        </div>
      )}
    </div>
  );
};

const answerList = [
  "Text Answer",
  "Number Answer",
  "Date",
  "Time",
  "Radio Buttons",
  "Checkboxes",
  "Lineal Scale",
  "Selection Grid"
];

const getAnswerType = (answerIndex: number) => {
  return answerList[answerIndex];
};
