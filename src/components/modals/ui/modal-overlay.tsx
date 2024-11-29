import { cn } from "@/lib/utils";

interface Props {
  onClick: () => void;
  className?: string;
}

const ModalOverlay = ({ onClick, className }: Props) => {
  return (
    <div
      data-label="modal-overlay"
      className={cn("fixed w-full h-full inset-0 bg-black/80", className)}
      onClick={onClick}></div>
  );
};

export default ModalOverlay;
