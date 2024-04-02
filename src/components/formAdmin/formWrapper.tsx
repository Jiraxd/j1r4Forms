import { FormTitle } from "./formFields/formTitle";
import { FormMenu } from "./formMenu";

export const FormWrapper = ({ form }: { form: any }) => {
  console.log(form);
  return (
    <div
      className="overflow-x-auto"
      style={{
        height: "calc(100vh - 118px)",
      }}
    >
      <div className="mt-44 mx-auto w-[770px]">
        <div className="flex min-h-16 items-center justify-center min-w-96 break-words">
          <FormTitle
            title={form.formtitle}
            description={form.formdescription}
            id={form.formid}
          />
          <FormMenu form={form} />
        </div>
      </div>
    </div>
  );
};
