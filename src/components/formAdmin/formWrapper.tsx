import { useState } from "react";
import { FormField } from "./formFields/FormField";
import { FormTitle } from "./formFields/formTitle";
import { FormMenu } from "./formMenu";
import { updatePositionField } from "../../../actions/dbUpdates";

export const FormWrapper = ({
  form,
  callback,
}: {
  form: any;
  callback: Function;
}) => {
  const [selectedField, setSelectedField] = useState<number>(-1);
  console.log(form);
  const callbackCreateField = (formnew: any) => {
    callback(formnew);
  };
  const callbackSelectedField = (fieldIndex: number) => {
    setSelectedField(fieldIndex);
  };
  const callbackAnswerChange = (fieldIndex: number, answerindex: number) => {
    const newform = { ...form };
    newform.fields[fieldIndex].fieldAnswerType = answerindex;
    callback(newform);
  };
  const callbackPositionChange = (
    pos: number,
    up: boolean
  ) => {
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

        <div className="flex flex-col items-center pb-40">
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
                      setSelectedField(index);
                    }}
                  >
                    <FormField
                      field={field}
                      selected={selectedField === index}
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
      </div>
    </div>
  );
};
