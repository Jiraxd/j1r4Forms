import { useEffect, useState } from "react";
import { LoaderCircle } from "../loader";
import { db } from "@/lib/db";
import { FormDisplay } from "./formDisplay";
import { getFormsServer } from "../../../actions/getForms";
import { getAuth } from "../../../actions/getAuth";
import { array } from "zod";
import bcryptjs from "bcryptjs";
import { createFormServer } from "../../../actions/createForm";
import { useRouter } from "next/navigation";

export type FormModel = {
  id: string;
  name: string;
};
export const FormPreview = () => {
  const [loading, setLoading] = useState<null | FormModel[]>(null);
  const router = useRouter();
  useEffect(() => {
    async function getForms() {
      let session = await getAuth();
      if (!session?.user?.id) {
        setLoading([]);
        return;
      }
      const forms = await getFormsServer(session.user.id);
      let formArray = new Array<FormModel>();
      if (forms == null) return;
      for (let form of forms) {
        formArray.push({
          id: form.formid,
          name: form.name,
        });
      }
      setLoading(formArray);
    }
    getForms();
  });

  const createForm = async () => {
    const session = await getAuth();
    if (!session?.user?.id) {
      return;
    }
    let formid = await createFormServer(session.user.id);
    router.push(`/forms/form/${formid}`);
  };
  if (loading === null)
    return (
      <div className="flex w-full min-h-screen">
        <div
          className="flex gap-24 flex-wrap w-full flex-row justify-center"
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            height: "maxContent",
          }}
        >
          <LoaderCircle />
        </div>
      </div>
    );
  if (loading.length === 0)
    return (
      <div className="flex w-full">
        <div
          className="mt-40 flex gap-24 flex-wrap w-full flex-row justify-center"
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            height: "maxContent",
          }}
        >
          <span className="font-bold text-gray-600 text-3xl">
            You do not have any forms yet!
          </span>
          <button
            className="btn btn-primary w-60 h-18"
            onClick={() => createForm()}
          >
            Create new form...
          </button>
        </div>
      </div>
    );
  return (
    <div className="flex w-full">
      <div
        className="mt-40 flex gap-24 flex-wrap w-full flex-row justify-center"
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        {loading.map((value) => (
          <FormDisplay key={value.id} formID={value.id} formName={value.name} />
        ))}
        <button
          className="btn btn-primary w-32 h-10"
          onClick={() => createForm()}
        >
          Create new form...
        </button>
      </div>
    </div>
  );
};
