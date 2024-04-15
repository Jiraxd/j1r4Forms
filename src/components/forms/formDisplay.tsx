import { useRouter } from "next/navigation";
import Image from "next/image";
import { list } from "@vercel/blob";
import { useEffect, useState } from "react";
import { LoaderCircle } from "../loader";

type Props = {
  formName: string;
  formID: string;
};

export const FormDisplay = ({ formName, formID }: Props) => {
  const [imageURL, setImageURL] = useState<string>(`/${formID}.webp`);
  const router = useRouter();
  useEffect(() => {
    async function getImage() {
      const response = await list({
        prefix: formID,
        token: process.env.BLOB_TOKEN,
      });
      console.log(response);
      setImageURL(response.blobs[0].url);
    }
    if (process.env.NODE_ENV === "production") getImage();
  }, []);
  return (
    <button
      className="cursor-pointer flex-col items-center"
      onClick={() => {
        router.push(`/forms/form/${formID}
        `);
      }}
    >
      {process.env.NODE_ENV === "production" ? (
        <>
          {imageURL === `/${formID}.webp` ? (
            <LoaderCircle />
          ) : (
            <Image
              src={imageURL}
              className="min-w-[256px]"
              alt="logo"
              width={256}
              height={128}
            />
          )}
        </>
      ) : (
        <Image
          src={imageURL}
          className="min-w-[256px]"
          alt="logo"
          width={256}
          height={128}
        />
      )}
      <div className="mt-4">{formName}</div>
    </button>
  );
};
