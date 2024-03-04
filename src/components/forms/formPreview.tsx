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
            // TODO: fetchnout forms
        }
        getForms();
    });
    if(loading === null) return <LoaderCircle />;
    if(loading.length === 0) return (
        <CreateFormBTN>
                <button className="btn btn-primary w-24 h-12 mr-4">Create new form...</button>
        </CreateFormBTN>
    );
    return(
        <>
            {loading.map((value) => (
                <FormDisplay key={value.id} formID={value.id} formName={value.name} />
            ))}
        </>
    );
}