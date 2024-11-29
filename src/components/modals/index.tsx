import { useContextProvider } from "@/store/context-provider";

// Helpers
import ConfirmModal from "./ui/confirm-modal";
import ModalWrapper from "./ui/modal-wrapper";
import AlertModal from "./ui/alert-modal";
import ModalWrapperCustom from "./ui/modal-wrapper-custom";
import ModalWrapperProcess from "./ui/modal-wrapper-process";

const Empty = () => <>please provide {"content"} here</>;

const ModalHandler = () => {
  const { modal, setModal } = useContextProvider();

  document.body.style.overflow = modal ? "hidden" : "unset";
  if (!modal) return null;

  const { content = Empty, ...others } = modal;

  // close modal
  const closeModal = () => {
    if (others.type != "process") setModal(null);
  };

  // process or custom modal logic
  if (others.type == "process" || others.type == "custom")
    return (
      <ModalWrapperCustom
        {...others}
        closeModal={others.type == "custom" ? closeModal : () => {}}>
        {others.type == "custom" ? content : ModalWrapperProcess}
      </ModalWrapperCustom>
    );

  const modalBody =
    others.type == "alert"
      ? AlertModal
      : others.type == "confirm"
      ? ConfirmModal
      : content;

  return (
    <ModalWrapper {...others} closeModal={closeModal}>
      {modalBody}
    </ModalWrapper>
  );
};

export default ModalHandler;
/**
  type == "alert" &&  AlertModal 
  type == "dialog" &&  ConfirmModal 
  type &&  ModalContent 
*/
