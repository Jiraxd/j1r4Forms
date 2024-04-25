import { ChangeEvent, Suspense, useState } from "react";
import { LoaderCircle } from "../loader";
import { createLinkForm } from "../../../actions/createShareLink";

interface ShareFormProps {
  children: React.ReactNode;
  formid: string;
}

export const ShareFormBtn = ({ children, formid }: ShareFormProps) => {
  const [permanentChecked, setPermanentChecked] = useState<boolean>(false);
  const [loadingLink, setLoadingLink] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");
  const onClickHandle = () => {
    //@ts-ignore
    document.getElementById("share_form_modal").showModal();
  };

  const onClickGenerate = async () => {
    if (link !== "") return;

    if (!permanentChecked) {
      if (date == null) {
        setError("Please select a date or check the 'permanent link' checkbox");
        return;
      }
    }
    setError("");
    setLoadingLink(true);
    const linktmp = await createLinkForm(
      formid,
      permanentChecked ? new Date("1970-01-01") : date || new Date("1970-01-01")
    );
    setLink(linktmp);
  };

  return (
    <span onClick={onClickHandle} className="cursor-pointer">
      {children}
      <dialog id="share_form_modal" className="modal cursor-default">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Share your form</h3>
          {loadingLink ? (
            <>
              {link === "" ? (
                <LoaderCircle />
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "j1r4-forms.vercel.app/forms/" + link
                    );
                  }}
                >
                  <div>Link:</div>
                  <div>{"j1r4-forms.vercel.app/forms/" + link}</div>
                  <div className="text-sm italic">Click to copy</div>
                </div>
              )}
            </>
          ) : (
            <div className="py-4">
              <div>
                <p>Link expiration date:</p>
                <input
                  className="mt-2"
                  type="date"
                  disabled={permanentChecked}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.valueAsDate) setDate(e.target.valueAsDate);
                    else setError("Invalid date");
                  }}
                ></input>
                <p className="text-red-500">{error}</p>
                <div className="flex items-center">
                  <p>Permanent</p>
                  <span className="ml-2">
                    <input
                      className="mt-2 checkbox"
                      type="checkbox"
                      onClick={() => setPermanentChecked(!permanentChecked)}
                    ></input>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="modal-action">
            <button className="btn btn-success" onClick={onClickGenerate}>
              Generate link
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </span>
  );
};
