import { useState } from "react";

export const LinealScaleUser = ({
  field,
  register,
}: {
  field: any;
  register: any;
}) => {
  const [MinNumber, setMinNumber] = useState<number>(
    parseInt(
      ((field.Answers as []).find((f: any) => f.answerType === 3) as any)
        .answerName
    )
  );
  const [MaxNumber, setMaxNumber] = useState<number>(
    parseInt(
      ((field.Answers as []).find((f: any) => f.answerType === 4) as any)
        .answerName || 5
    ) || 5
  );
  const [MinTitle, setMinTitle] = useState<string>(
    ((field.Answers as []).find((f: any) => f.answerType === 1) as any)
      .answerName || "Minimum"
  );
  const [MaxTitle, setMaxTitle] = useState<string>(
    ((field.Answers as []).find((f: any) => f.answerType === 2) as any)
      .answerName || "Maximum"
  );
  return (
    <div className="px-3">
      <div className="px-3 flex flex-col gap-2">
        <div className="flex flex-row gap-6">
          <div className="flex items-end">{MinTitle}</div>
          {Array(MaxNumber + 1 - MinNumber)
            .fill("x")
            .map((value, index) => (
              <div className="flex flex-col items-center" key={index}>
                <div>{MinNumber === 0 ? index : index + 1}</div>
                <input
                  type="radio"
                  className="radio cursor-pointer"
                  value={index}
                  {...register((field.fieldID as number).toString())}
                  style={{
                    borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                  }}
                />
              </div>
            ))}
          <div className="flex items-end">{MaxTitle}</div>
        </div>
      </div>
    </div>
  );
};
