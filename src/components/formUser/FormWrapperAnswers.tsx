"use client";
import { Form, useForm } from "react-hook-form";
import { FormFieldUser } from "./FormFieldUser";
import { FormTitleUser } from "./FormTitleUser";
import { AddFormAnswer } from "../../../actions/dbUpdates";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const FormWrapperAnswers = ({
  form,
  userid,
}: {
  form: any;
  userid: string;
}) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <div className="overflow-x-auto">
      {submitted ? (
        <div className="flex w-full min-h-screen align-middle items-center flex-row">
          <div className="w-full text-center">
            <div className="text-lg font-bold w-full text-center">
              Thank you for answering!
            </div>
            <div
              className="text-md w-full text-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              Return to main page
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-32 mx-auto w-[770px]">
          <div className="flex min-h-16 items-center justify-center min-w-96 break-words">
            <FormTitleUser
              title={form.formtitle}
              description={form.formdescription}
            />
          </div>
          <form
            onSubmit={handleSubmit(async (data) => {
              await AddFormAnswer(form.formid, data, userid);
              setSubmitted(true);
            })}
          >
            <div className="flex flex-col items-center pb-16">
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
            <button type="submit" className="btn btn-primary w-36">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
