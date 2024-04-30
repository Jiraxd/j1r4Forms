export const FormFieldUser = ({ field }: { field: any }) => {
  return (
    <div className="flex rounded-lg flex-col w-full bg-slate-600 min-w-[770px] max-w-[770px] ">
      {field.fieldAnswertype === 0 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<TextAnswer  field={field} />"}
        </div>
      )}
      {field.fieldAnswertype === 1 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<NumberAnswer  field={field} />"}
        </div>
      )}
      {field.fieldAnswertype === 2 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<DateAnswer} field={field} />"}
        </div>
      )}
      {field.fieldAnswertype === 3 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<TimeAnswer  field={field} />"}
        </div>
      )}
      {field.fieldAnswertype === 4 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<RadioButtons field={field} />"}
        </div>
      )}
      {field.fieldAnswertype === 5 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<CheckboxAnswer field={field} />"}
        </div>
      )}
      {field.fieldAnswertype === 6 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<LinealScale  field={field}  />"}
        </div>
      )}
      {field.fieldAnswertype === 7 && (
        <div className="w-full p-6 pt-2 pb-6">
          {"<SelectionGrid  field={field} />"}
        </div>
      )}
    </div>
  );
};
