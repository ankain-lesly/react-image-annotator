import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const ConfirmModal = ({
  onComplete,
  message,
  closeModal,
}: ModalOptionTypes) => {
  const [status, setStatus] = useState<"no" | "loading" | "error" | "result">(
    "no"
  );

  const handleConfirm = async () => {
    setStatus("loading");

    const result = await onComplete?.();
    if (!result) return setStatus("error");
    else closeModal?.();
  };
  return (
    <div className="">
      <div className="text-center_">{message}</div>
      {status == "error" && (
        <div className="text-center text-danger mt-3">
          Something went wrong. Try again
        </div>
      )}

      {status == "result" && (
        <div className="text-center text-success font-bold">
          Item Deleted Successful
        </div>
      )}

      <div
        className={`flex justify-end mt-6 ${
          status == "loading" ? "pointer-events-none opacity-50" : ""
        }`}>
        <button
          className={`btn rounded-full w-full max-w-[100px]`}
          type="submit"
          onClick={closeModal}>
          <span className="inline-block flex-shrink-0 text-wrap">Cancel</span>
        </button>

        <button
          className={`btn flex-center gap-2 btn-blue rounded-full w-full max-w-[150px] ${
            status == "loading" ? "opacity-70" : ""
          }`}
          type="submit"
          // {{status == "loading" && <BiLoaderAlt className="animate-spin" />}}

          disabled={status == "loading" ? true : false}
          onClick={handleConfirm}>
          <span className="inline-block flex-shrink-0 text-wrap">Continue</span>
          {status == "loading" && <BiLoaderAlt className="animate-spin" />}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
