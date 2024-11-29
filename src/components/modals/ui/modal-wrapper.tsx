import { FiX } from "react-icons/fi";
import ModalOverlay from "./modal-overlay";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// type Props = ModalPropsMain & {
//   children: (props: ModalChildrenTypes) => JSX.Element;
//   closeModal: () => void;
// };

// type Props = ModalOptionTypes & {
//   closeModal: () => void;
// };

const ModalWrapper = ({
  closeModal,
  overlay = true,
  label,
  className = "",
  children: ModalBody,
  options,
  closeBtn = true,
  type,
  onCloseModal,
}: ModalProps) => {
  // console.log("OVERLAY ", overlay);
  const handleClick = () => {
    if (onCloseModal) return onCloseModal?.();
    else return closeModal?.();
  };

  const variants: Record<ModalTypes, string> = {
    bottom_sheet: "self-end rounded-t-3xl m-0",
    bottom_sheet_mobile:
      "self-end sm:self-center rounded-t-3xl sm:rounded-b-3xl mx-0",
    default: "rounded-2xl mx-2",
    confirm: "max-w-md rounded-2xl",
    alert: "max-w-md rounded-2xl",
    process: "rounded-2xl max-w-max",
    custom: "",
  };

  // const modalVariants = {
  //   hidden: { opacity: 0, y: "-100vh" },
  //   visible: {
  //     opacity: 1,
  //     y: "0",
  //     transition: { type: "spring", stiffness: 300 },
  //   },
  //   exit: { opacity: 0, y: "100vh", transition: { duration: 0.5 } },
  // };
  return (
    <div className="fixed z-[1000] inset-0 top-0 left-0 flex-center">
      {/* Overlay */}
      <ModalOverlay onClick={overlay ? handleClick : () => {}} />

      <div className="hidden sm:rounded-b-3xl rounded-2xl m-0 max-w-md" />
      <div className="hidden max-w-max" />
      <motion.div
        // >>
        initial={{ opacity: 0, scale: 0.5, y: "-30%" }}
        animate={{ opacity: 1, scale: 1, y: "0" }}
        exit={{ opacity: 0, scale: 0.4, y: "30%" }}
        transition={{ duration: 0.4, type: "spring" }}
        // >>
        data-modal="preference"
        className={cn(
          "w-full mx-2 max-w-xl ring-2 ring-primary/10 bg-dark text-light relative px-4 py-6 md:px-6 md:py-9 flex flex-col  self-center border border-muted/10",
          className,
          variants[type as ModalTypes] || variants["default"]
        )}>
        {label && (
          <div className="mb-2 text-lg font-medium tracking-tight">{label}</div>
        )}
        <section className="h-full max-h-[80vh] overflow-auto no-scrollbar">
          {<ModalBody {...options} closeModal={handleClick} />}
        </section>
        <div className="modal-actions">
          {closeBtn && (
            <button
              className="pin-0 absolute right-2 top-1 z-10 flex px-1 py-1 items-center justify-center text-light transition-colors duration-300 hover:text-danger"
              onClick={handleClick}>
              <FiX fontSize={22} />
            </button>
          )}
        </div>
      </motion.div>
      {/* </div> */}
    </div>
  );
};

export default ModalWrapper;
