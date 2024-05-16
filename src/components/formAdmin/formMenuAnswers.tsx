import { useCallback, useEffect, useState } from "react";
import { addNewField } from "../../../actions/dbUpdates";

export const FormMenuAnswers = ({
  callback,
  selectedAnswer,
  length,
}: {
  callback: Function;
  selectedAnswer: number;
  length: number;
}) => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const handleRight = async () => {
    callback("right");
  };
  const handleLeft = async () => {
    callback("left");
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
      <div className="right-[-52px] top-[-70px] absolute">
        <div className="flex-col">
          <button
            className="p-1 pl-2 pr-2 text-2xl rounded-md bg-slate-500 text-slate-200"
            onClick={handleLeft}
          >
            {"<"}
          </button>
        </div>
      </div>
      <div className="right-[-90px] top-[-70px] absolute">
        <div className="flex-col">
          <button
            className="p-1 pl-2 pr-2 text-2xl rounded-md bg-slate-500 text-slate-200"
            onClick={handleRight}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="right-[-80px] top-[-5px] absolute">
        <div className="flex-col">
          <div className="p-1 pl-2 pr-2 text-2xl rounded-md bg-slate-500 text-slate-200">
            {selectedAnswer + 1 + "/" + length}
          </div>
        </div>
      </div>
    </div>
  );
};
