import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  formName: string;
  formID: string;
};

export const FormDisplay = ({ formName, formID }: Props) => {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer flex-col items-center"
      onClick={() => {
        router.push(`/forms/form/${formID}
        `);
      }}
    >
      <img
        src={`/${formID}.webp`}
        className="min-w-[256px]"
        alt="logo"
        width={256}
        height={128}
      />
      <div className="mt-4">{formName}</div>
    </button>
  );
};
