import { useRouter } from "next/navigation";
import Image from "next/image";
import { list } from "@vercel/blob";

type Props = {
  formName: string;
  formID: string;
};

export const FormDisplay = async ({ formName, formID }: Props) => {
  const router = useRouter();
  const response = await list();
  console.log(response);
  return (
    <button
      className="cursor-pointer flex-col items-center"
      onClick={() => {
        router.push(`/forms/form/${formID}
        `);
      }}
    >
      <Image
        src={
          process.env.NODE_ENV === "production"
            ? response.blobs.find((value) => value.pathname === formID)
                ?.downloadUrl || ""
            : `/${formID}.webp`
        }
        className="min-w-[256px]"
        alt="logo"
        width={256}
        height={128}
      />
      <div className="mt-4">{formName}</div>
    </button>
  );
};
