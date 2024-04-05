import { Input } from "@/components/ui/input";
import { useState } from "react";
import { fieldUpdateTitle } from "../../../../actions/dbUpdates";

export const FormField = ({
  field,
  index,
  formid,
}: {
  field: any;
  index: any;
  formid: string;
}) => {
  const [fieldTitle, setTitle] = useState<string>(field.fieldTitle);
  const handleNameChange = async () => {
    if (fieldTitle === field.fieldTitle) return;
    await fieldUpdateTitle(formid, field.fieldID, fieldTitle);
  };
  return (
    <div className="flex rounded-lg flex-col w-full bg-slate-600 min-w-[770px]">
      <div className="w-full p-6">
        {" "}
        <Input
          className="text-xl font-bold text-slate-300 border-transparent"
          type="text"
          value={fieldTitle}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleNameChange()}
          spellCheck={false}
        />
      </div>
    </div>
  );
};
