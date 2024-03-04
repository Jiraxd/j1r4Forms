import { useEffect, useState } from "react";
import { LoaderCircle } from "../loader";
import { db } from "@/lib/db";
import { FormDisplay } from "./formDisplay";
import { CreateFormBTN } from "./CreateFormBTN";

export type FormModel = {
    id: string;
    name: string;
}
export const FormPreview = () => {
    const [loading, setLoading] = useState<null | FormModel[]>(null);
    useEffect(() => {
        async function getForms(){
            const model: FormModel = {
                id: "id",
                name: "name"
            };
            setLoading([model, model, model, model]);
            // TODO: fetchnout forms
        }
        getForms();
    });
    if(loading === null) return <LoaderCircle />;
    if(loading.length === 0) return (
        <>
        <span className="font-bold text-gray-600 text-3xl">You do not have any forms yet!</span>
        <CreateFormBTN>
                <button className="btn btn-primary w-60 h-18 mt-6">Create new form...</button>
        </CreateFormBTN>
        </>
    );
    return(
        <div className="mt-40">
            {loading.map((value) => (
                <FormDisplay key={value.id} formID={value.id} formName={value.name} />
            ))}
        </div>
    );
}