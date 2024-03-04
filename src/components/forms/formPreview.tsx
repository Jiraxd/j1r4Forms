import { useEffect, useState } from "react";
import { LoaderCircle } from "../loader";


export const FormPreview = () => {
    const [loading, setLoading] = useState<any>(null);
    useEffect(() => {

    });
    if(loading === null) return <LoaderCircle />;
    return (
        <>
         
        </>
    );
}