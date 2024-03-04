import { useEffect, useState } from "react";
import { LoaderCircle } from "../loader";
import { db } from "@/lib/db";
import { FormDisplay } from "./formDisplay";
import { CreateFormBTN } from "./CreateFormBTN";


export const FormPreview = () => {
    const [loading, setLoading] = useState<any>(null);
    useEffect(() => {
        async function getForms(){
            // TODO: fetchnout forms
        }
        getForms();
    });
    if(loading === null) return <LoaderCircle />;
    if((loading as []).length === 0) return (
        <CreateFormBTN>
                <button className="btn btn-primary w-24 h-12 mr-4">Create new form...</button>
        </CreateFormBTN>
    );
    return(
        <>
            {(loading as []).map((value) => (
                <FormDisplay formID={(value as any).id} formName={(value as any).name} />
            ))}
        </>
    );
}