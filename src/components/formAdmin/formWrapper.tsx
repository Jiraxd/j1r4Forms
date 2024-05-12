import { useState } from "react";
import { FormField } from "./formFields/FormField";
import { FormTitle } from "./formFields/formTitle";
import { FormMenu } from "./formMenu";
import { updatePositionField } from "../../../actions/dbUpdates";

export const FormWrapper = ({
  form,
  callback,
  questionsSelected,
}: {
  form: any;
  callback: Function;
  questionsSelected: boolean;
}) => {
  const [selectedField, setSelectedField] = useState<number>(-1);
  const callbackCreateField = (formnew: any) => {
    callback(formnew);
  };
  const callbackAnswerChange = (fieldPos: number, answerindex: number) => {
    const newform = { ...form };
    newform.fields.find((f: any) => f.position === fieldPos).fieldAnswerType =
      answerindex;
    callback(newform);
  };
  const callbackPositionChange = (pos: number, up: boolean) => {
    const newform = { ...form };
    const field = newform.fields.find((f: any) => f.position === pos);
    if (!field) return;
    if (up) {
      if (field.position === newform.fields.length - 1) return;
      const replace = newform.fields.find(
        (f: any) => f.position === field.position + 1
      );
      replace.position--;
      field.position++;
      callback({ ...newform });
      updatePositions(
        field.position,
        replace.position,
        up,
        field.fieldID,
        replace.fieldID
      );
    } else {
      if (field.position === 0) return;
      const replace = newform.fields.find(
        (f: any) => f.position === field.position - 1
      );
      replace.position++;
      field.position--;
      callback({ ...newform });
      updatePositions(
        field.position,
        replace.position,
        up,
        field.fieldID,
        replace.fieldID
      );
    }
  };

  async function updatePositions(
    updatePos: number,
    replacePos: number,
    up: boolean,
    fieldID: number,
    fieldIDReplace: number
  ) {
    await updatePositionField(
      updatePos,
      fieldID,
      fieldIDReplace,
      replacePos,
      form.formid
    );
  }
  return (
    <div className="overflow-x-auto">
      <div className="mt-32 mx-auto w-[770px]">
        {questionsSelected ? (
          <>
            <div
              className="flex min-h-16 items-center justify-center min-w-96 break-words"
              onClick={() => setSelectedField(-1)}
            >
              <FormTitle
                title={form.formtitle}
                description={form.formdescription}
                id={form.formid}
              />
              <FormMenu form={form} callback={callbackCreateField} />
            </div>

            <div className="flex flex-col items-center pb-60">
              {(form.fields as []).length === 0 ? (
                <div>Create new questions in the menu!</div>
              ) : (
                (form.fields as [])
                  .toSorted((a, b) => {
                    if ((a as any).position < (b as any).position) {
                      return -1;
                    }
                    if ((a as any).position > (b as any).position) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((field: any, index: number) => {
                    return (
                      <div
                        key={field.position}
                        className="mt-10"
                        onClick={() => {
                          setSelectedField(field.position);
                        }}
                      >
                        <FormField
                          key={field.position}
                          field={field}
                          selected={selectedField === field.position}
                          formid={form.formid}
                          callback={callbackAnswerChange}
                          indexForm={index}
                          callbackPosition={callbackPositionChange}
                        />
                      </div>
                    );
                  })
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex min-h-16 items-center justify-center min-w-96 break-words">
              <div
                className="flex border-b-2 border-r-2 rounded-lg flex-col w-full bg-slate-600"
                style={{
                  borderColor: "rgb(106,111,121)",
                }}
              >
                <div className="w-full p-6">
                  <div className="text-3xl font-bold text-gray-300 border-transparent">
                    {form.formtitle}
                  </div>
                  <div className="text-lg text-gray-300 border-transparent mt-4">
                    {form.formdescription}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center pb-60">
              <div className="text-3xl font-bold text-gray-300 border-transparent my-4">
                {"Answers to questions in your form:"}
              </div>
              {/*Add answers*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
