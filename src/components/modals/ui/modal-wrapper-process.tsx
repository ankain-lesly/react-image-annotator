import { BiLoader } from "react-icons/bi";
import ModalContentWrapper from "./modal-content-wrapper";

const ModalWrapperProcess = (props: ModalOptionTypes) => {
  const { label = "", className = "" } = props as ModalProps;
  return (
    <ModalContentWrapper>
      <main
        data-modal="preference"
        className={`ring-1 bg-dark text-light relative rounded-2xl w-4/5 mx-auto px-4 py-6 md:px-6 md:py-9 flex-center lg:mt-0 border border-muted/40 ${className}`}>
        <div className="flex items-center gap-4">
          <div>
            <BiLoader className="animate-spin" fontSize={26} />
          </div>
          {label && <div className="font-bold tracking-tight">{label}</div>}
          {!label && (
            <div className="font-bold tracking-tight">Processing...</div>
          )}
        </div>
      </main>
    </ModalContentWrapper>
  );
};

export default ModalWrapperProcess;
