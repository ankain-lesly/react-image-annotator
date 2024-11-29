import ModalOverlay from "./modal-overlay";

// type Props = ModalPropsMain & {
//   children: (props: ModalChildrenTypes) => JSX.Element;
//   closeModal: () => void;
// };

const ModalWrapperCustom = ({
  closeModal,
  overlay = true,
  children: ModalBody,
  options,
  ...others
}: ModalProps) => {
  return (
    <div className="fixed z-[1000] inset-0 top-0 left-0">
      <ModalOverlay onClick={overlay ? closeModal : () => {}} />
      <div className="flex-center h-full" aria-modal="true" tabIndex={1}>
        {<ModalBody {...others} {...options} />}
      </div>
    </div>
  );
};

export default ModalWrapperCustom;
