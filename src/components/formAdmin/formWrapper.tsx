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
  console.log(form);
  const callbackCreateField = (formnew: any) => {
    callback(formnew);
  };
  return (
    <div className="overflow-x-auto">
      <div className="mt-32 mx-auto w-[770px]">
        <div className="flex min-h-16 items-center justify-center min-w-96 break-words">
          <FormTitle
            title={form.formtitle}
            description={form.formdescription}
            id={form.formid}
          />
          <FormMenu form={form} callback={callbackCreateField} />
        </div>
        <div className="flex flex-col items-center mb-20">
          {(form.fields as []).length === 0 ? (
            <div>Create new questions in the menu!</div>
          ) : (
            (form.fields as []).map((field: any, index: number) => {
              return (
                <div key={index} className="mt-10">
                  <FormField field={field} index={index} formid={form.formid} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
