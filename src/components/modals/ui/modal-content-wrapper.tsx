import { cn } from "@/lib/utils";

interface Props {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function ModalContentWrapper({ children, className }: Props) {
  return <div className={cn("", className)}>{children}</div>;
}
