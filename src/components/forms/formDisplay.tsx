import { useRouter } from "next/navigation";

type Props = {
  formName: string;
  formID: string;
};

export const FormDisplay = ({ formName, formID }: Props) => {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer flex-col items-center"
      onClick={() => router.push(`/forms/form/${formID}`)}
    >
      {/*tady bude preview*/}
      <div>{formName}</div>
      <div>{formID}</div>
    </button>
  );
};
