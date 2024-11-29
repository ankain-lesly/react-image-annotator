import { ChangeEvent, useState } from "react";

export interface OptionProps {
  value: string | number;
  label: string;
}
export type OptionTypes = OptionProps[];

export type InputKinds =
  | "text"
  | "tel"
  | "number"
  | "textarea"
  | "date"
  | "select"
  // | "select-default"
  | "password"
  | "email"
  | "radio"
  | "checkbox"
  | "file";

export interface InputProps {
  name: string;
  type?: InputKinds;
  variant?: "normal" | "modern";
  placeholder?: string;
  value?: string | string[] | number;
  readOnly?: boolean;
  id?: string;
  options?: OptionTypes;
  optionsList?: string[];
  style?: object;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  accept?: string;
  className?: string;
  multiple?: boolean;
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

function Input({
  type,
  variant,
  value = "",
  className = "",
  options = [],
  optionsList = [],
  ...others
}: InputProps) {
  const [curValue, setCurValue] = useState(value || "");
  const ngClass = {
    normal: "f__input ",
    modern: "f__input peer input-modern placeholder:opacity-0 ",
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const input = event.target as typeof event.target & { value: string };
    setCurValue(input.value);
    others.onChange?.(event);
  };

  switch (type) {
    case "textarea":
      return (
        <textarea
          {...others}
          value={curValue}
          onChange={handleChange}
          className={ngClass[variant || "normal"] + className}></textarea>
      );

    // case "select-default":
    case "select":
      return (
        <select
          {...others}
          value={curValue}
          onChange={handleChange}
          className={ngClass[variant || "modern"] + className}>
          <option value={""} hidden>
            {others.placeholder ? others.placeholder : "Click to select"}
          </option>
          {/* Handler */}
          {!options.length && !optionsList.length && (
            <option value={""} disabled>
              {/* No data... */}- - -
            </option>
          )}
          {/* Options as {} */}
          {options.length &&
            options.map((data, i) => (
              <option key={i} value={data.value}>
                {data.label}
              </option>
            ))}
          {/* Options as arr */}
          {optionsList.length &&
            optionsList.map((data, i) => <option key={i}>{data}</option>)}
        </select>
      );

    case "file":
      return (
        <input
          {...others}
          // value={curValue}
          onChange={handleChange}
          type={type}
          className={ngClass[variant || "normal"]}
        />
      );

    default:
      return (
        <input
          {...others}
          value={curValue}
          onChange={handleChange}
          type={type}
          className={ngClass[variant || "normal"] + className}
        />
      );
  }
}

export default Input;
