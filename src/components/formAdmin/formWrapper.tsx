import { useState } from "react";
import { FormField } from "./formFields/FormField";
import { FormTitle } from "./formFields/formTitle";
import { FormMenu } from "./formMenu";

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
  const callbackAnswerChange = (fieldIndex: number, answerindex: number) => {
    const newform = form;
    newform.fields[fieldIndex].fieldAnswerType = answerindex;
    callback(newform);
  };
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
                    key={index}
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
