import { BiLoaderAlt } from "react-icons/bi";

interface Props {
  className?: string;
  isLoading?: boolean;
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
}
const ButtonLoader = ({
  label,
  type = "button",
  isLoading,
  onClick,
  className = "",
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`line-clamp-1 font-bold relative overflow-hidden btn flex-1 p-3.5 w-full rounded-full btn-dark text-light ${className}`}
      type={type}
      disabled={isLoading}>
      {label}
      {isLoading && (
        <span
          className={`loader bg-dark text-light absolute inset-0 flex-center pointer-events-none ${className}`}>
          <BiLoaderAlt fontSize={25} className="animate-spin" />
        </span>
      )}
    </button>
  );
};

export default ButtonLoader;
