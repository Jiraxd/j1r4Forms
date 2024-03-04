type Props = {
formName: string;
formID: string;
}


export const FormDisplay = ({formName, formID}: Props) => {
    return(
        <div className="cursor-pointer flex-col items-center">
            {/*tady bude preview*/}
        <span>{formName}</span>
        <span>{formID}</span>
        </div>
    );
}