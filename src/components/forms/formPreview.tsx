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
    const [page, setPage] = useState<number>(1);
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
    // TODO: pokud vice nez X formu, dalsi stranka
    return(
        <div>
        <div className="mt-40 flex gap-24 flex-wrap w-full flex-row justify-center" >
            {loading.map((value) => (
                <FormDisplay key={value.id} formID={value.id} formName={value.name} />
            ))}
        </div>
        <div className="mb-20 flex w-ful justify-center">
                {"Page: " + page}
        </div>
        </div>
    );
}