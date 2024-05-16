import { FormAnswerField } from "./formAnswers/FormAnswerField";

export const FormAnswersAdmin = ({
  form,
  selectedIndex,
}: {
  form: any;
  selectedIndex: number;
}) => {
  return (
    <>
      {(form.fields as [])
        .toSorted((a, b) => {
          if ((a as any).position < (b as any).position) {
            return -1;
          }
          if ((a as any).position > (b as any).position) {
            return 1;
          }
          return 0;
        })
        .map((field: any, index: number) => {
          return (
            <div key={field.position} className="mt-10">
              <FormAnswerField
                field={field}
                answers={form.answersfromusers[selectedIndex]}
              />
            </div>
          );
        })}
    </>
  );
};
