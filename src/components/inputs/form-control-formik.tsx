import { ReactNode, useState } from "react";
import Input, { InputProps } from "./input";
import { useField } from "formik";
import { BiLock, BiLockOpenAlt } from "react-icons/bi";

export interface FormFieldTypes extends InputProps {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
}

function FormControlFormik({
  type: inputType,
  label,
  error,
  hint,
  ...others
}: FormFieldTypes) {
  const [fields, meta] = useField(others);
  const errorText = meta.touched && meta.error ? meta.error : false;
  const [type, setInputType] = useState(inputType);

  const newFields = { ...fields } as FormFieldTypes;
  newFields.id = others.id || others.name;

  return (
    <div className="control w-full" data-js={label}>
      {/* Label */}
      {label && (
        <label
          className="capitalize block mb-2 text-sm font-bold"
          htmlFor={fields.name || ""}>
          {label}
        </label>
      )}
      <div className="relative flex-center">
        {/* Input */}
        <Input {...{ type, ...fields, ...others, variant: "normal" }} />
        {/* Show BTN */}
        {inputType == "password" && (
          <button
            type="button"
            title="Toggle private mode"
            className="text-2xs absolute right-2"
            onClick={() =>
              setInputType(type === "password" ? "text" : "password")
            }>
            {type === "password" ? (
              <BiLock fontSize={22} />
            ) : (
              <BiLockOpenAlt fontSize={22} />
            )}
          </button>
        )}
        {hint && <div className="mt-0.5 text-sm opacity-80">{hint}</div>}
      </div>

      {(error || errorText) && (
        <p
          className="help mt-1 text-xs font-bold text-danger"
          data-js="error-message">
          {error || errorText}
        </p>
      )}
    </div>
  );
}

export default FormControlFormik;
