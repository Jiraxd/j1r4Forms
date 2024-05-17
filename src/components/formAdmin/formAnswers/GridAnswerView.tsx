export const GridAnswerView = ({
  answerUser,
  field,
}: {
  answerUser: any;
  field: any;
}) => {
  const rowAnswers: any = (field.Answers as [])
    .filter((f: any) => f.answerType === 6)
    .toSorted((a: any, b: any) => {
      if ((a as any).answerPos < (b as any).answerPos) {
        return -1;
      }
      if ((a as any).answerPos > (b as any).answerPos) {
        return 1;
      }
      return 0;
    });
  const columnAnswers: any = (field.Answers as [])
    .filter((f: any) => f.answerType === 5)
    .toSorted((a: any, b: any) => {
      if ((a as any).answerPos < (b as any).answerPos) {
        return -1;
      }
      if ((a as any).answerPos > (b as any).answerPos) {
        return 1;
      }
      return 0;
    });
  return (
    <div className="px-3">
      <div className="overflow-auto">
        <div className="flex flex-row ml-32">
          {rowAnswers.map((answer: any, index: number) => (
            <div
              className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center h-9 py-2"
              key={index}
            >
              {rowAnswers[index].answerName}
            </div>
          ))}
        </div>
        <div className="flex flex-row mt-8 pb-4">
          <div className="flex flex-col w-36 gap-2">
            {columnAnswers.map((answer: any, index: number) => (
              <div
                className="text-md text-gray-300 border-transparent ml-4 text-ellipsis w-36 text-center h-9 py-2"
                key={index}
              >
                {columnAnswers[index].answerName}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between">
            {columnAnswers.map((answer: any, index: number) => (
              <div key={index} className="flex flex-row py-[6px]">
                {rowAnswers.map((answer: any, indexx: number) => (
                  <input
                    key={indexx}
                    type="radio"
                    name={"radio" + index.toString()}
                    className={`radio cursor-default text-gray-300 ml-[60px] mr-[76px]`}
                    style={{
                      borderColor: "rgb(209 213 219 / var(--tw-text-opacity))",
                    }}
                    checked={
                      (answerUser[index] as any)
                        ? (answerUser[index][1] as string) === indexx.toString()
                        : false
                    }
                    onChange={() => {}}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
