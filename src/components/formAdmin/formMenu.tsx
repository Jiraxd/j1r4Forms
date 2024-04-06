import { useCallback, useEffect, useState } from "react";
import { addNewField } from "../../../actions/dbUpdates";

export const FormMenu = ({
  form,
  callback,
}: {
  form: any;
  callback: Function;
}) => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const handleCreate = async () => {
    const formNew = await addNewField(form.formid, form.fields.length);
    callback(formNew);
  };
  onscroll = () => {
    setScrollPos(window.scrollY);
  };
  return (
    <div
      className="relative flex justify-end"
      style={{
        top: scrollPos,
        transition: "top 0.2s ease-out",
      }}
    >
      <div className="right-[-62px] top-[-70px] absolute">
        <div className="flex-col">
          <button
            className="p-1 pl-2 pr-2 text-2xl rounded-md bg-slate-500 text-slate-200"
            onClick={handleCreate}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
