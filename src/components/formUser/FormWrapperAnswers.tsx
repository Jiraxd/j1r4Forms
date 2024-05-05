"use client";
import { Form, useForm } from "react-hook-form";
import { FormFieldUser } from "./FormFieldUser";
import { FormTitleUser } from "./FormTitleUser";

export const FormWrapperAnswers = ({ form }: { form: any }) => {
  const { handleSubmit, register } = useForm();
  return (
    <div className="overflow-x-auto">
      <div className="mt-32 mx-auto w-[770px]">
        <div className="flex min-h-16 items-center justify-center min-w-96 break-words">
          <FormTitleUser
            title={form.formtitle}
            description={form.formdescription}
          />
        </div>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="flex flex-col items-center pb-60">
            {(form.fields as []).length === 0 ? (
              <div>There are no questions in this form!</div>
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
                    <div key={field.position} className="mt-10">
                      <FormFieldUser field={field} register={register} />
                    </div>
                  );
                })
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
