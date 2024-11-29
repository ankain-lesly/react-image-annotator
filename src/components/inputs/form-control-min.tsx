import { ReactNode, useState } from "react";
import Input, { InputProps } from "./input";

export interface FormFieldTypes extends InputProps {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
}

function FormControlMin({
  type: inputType,
  label,
  error,
  hint,
  ...fields
}: FormFieldTypes) {
  // CODE: custom select
  // if (inputType == "select")
  //   return (
  //     <CustomSelect
  //       label={label}
  //       error={error}
  //       hint={hint}
  //       isSearchable={isSearchable}
  //       isMultiple={isMultiple}
  //       {...fields}
  //     />
  //   );

  // CODE: others
  const [type, setInputType] = useState(inputType);
  if (!fields.placeholder && typeof label == "string")
    fields!.placeholder = label;
  if (!fields.id) fields.id = fields.name;

  // CODE: JSX
  return (
    <div className="control w-full" data-js={label}>
      {/* Input */}
      {label && (
        <label
          className="capitalize block mb-2 text-sm font-bold"
          htmlFor={fields.id || fields.name}>
          {label}
        </label>
      )}
      <div className="relative">
        <Input {...{ type, ...fields, variant: "normal" }} />
        {/* Show BTN */}
        {type == "password" && (
          <button
            type="button"
            title="Toggle private mode"
            className="ml-4 pr-8 text-2xs text-light-l"
            onClick={() =>
              setInputType(type === "password" ? "text" : "password")
            }>
            {type === "password" ? "show" : "hide"}
          </button>
        )}
        {hint && <div className="mt-0.5 text-sm opacity-80">{hint}</div>}
      </div>

      {error && (
        <p className="help mt-1 text-xs text-red" data-js="error-message">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormControlMin;
