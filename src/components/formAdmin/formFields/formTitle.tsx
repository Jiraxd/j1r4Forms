import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateTitleDesc } from "../../../../actions/dbUpdates";

export const FormTitle = ({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) => {
  const [formTitle, setTitle] = useState<string>(title);
  const [formDesc, setDesc] = useState<string>(description);

  const handleNameChange = async (type: string) => {
    switch (type) {
      case "title":
        if (formTitle === title) return;
        updateTitleDesc(id, "title", formTitle);
        break;
      case "desc":
        if (formDesc === description) return;
        updateTitleDesc(id, "desc", formDesc);
        break;
    }
  };
  return (
    <div
      className="flex border-b-2 border-r-2 rounded-lg flex-col w-full bg-slate-600"
      style={{
        borderColor: "rgb(106,111,121)",
      }}
    >
      <div className="w-full p-6">
        <Input
          className="text-4xl font-bold text-gray-300 border-transparent"
          type="text"
          value={formTitle}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleNameChange("title")}
          spellCheck={false}
        />
        <Input
          className="text-xl text-gray-300 border-transparent mt-4"
          type="text"
          value={formDesc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={() => handleNameChange("desc")}
          spellCheck={false}
        />
      </div>
    </div>
  );
};
