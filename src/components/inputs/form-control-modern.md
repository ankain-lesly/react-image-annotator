```tsx
import { useState } from "react";

import { BiCheck } from "react-icons/bi";
import Input from "./input";

interface Props {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  variant?: "normal" | "modern";
  error?: string;
}

function FormControlModernXX({
  type: inputType,
  label,
  error,
  ...fields
}: Props) {
  const [type, setInputType] = useState(inputType);
  if (!fields.placeholder) fields.placeholder = label;
  return (
    <div className="control pt-4" data-js={label}>
      <div className="relative flex items-center border-b border-muted/50 mt-1 control__on-placeholder">
        {/* Input */}
        <Input {...{ type, ...fields, variant: "normal" }} />
        <label
          className="absolute label-min top-1 left-0 font-semibold text-light-l transition-all duration-300"
          htmlFor={fields.id}>
          {label}
        </label>
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
        <div className="absolute top-2.5 right-0 mx-auto flex-center h-4 w-4 rounded-full bg-muted/40 font-bold">
          <BiCheck fontSize={12} />
        </div>
      </div>

      {error && (
        <p className="help mt-2 text-xs text-red" data-js="error-message">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormControlModernXX;
```
