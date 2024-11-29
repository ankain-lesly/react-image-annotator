import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputProps, OptionProps, OptionTypes } from "./input";
import { BiChevronDown, BiSearch, BiX } from "react-icons/bi";

export type OptionChangeValue = OptionTypes | string;

interface Props {
  multiple?: boolean;
  isSearchable?: boolean;
  onOptionChange?: (value: OptionChangeValue) => void;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  // align?: string;
}

type CustomProps1 = Omit<InputProps, "onChange">;
type CustomProps = Omit<CustomProps1, "type"> & Props;

// FormCustomSelect component
const FormCustomSelect = ({
  placeholder,
  options = [],
  optionsList = [],
  multiple,
  isSearchable = true,
  // onChange,
  onOptionChange,
  label,
  hint,
  error,
  id,
  name,
  className,
  value = "",
  style = {},
  ...others
}: // align,
CustomProps) => {
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [optionsData, setOptionsData] = useState<OptionTypes>([]); // Controls the visibility of the dropdown menu
  const [selectedOption, setSelectedOption] = useState<OptionTypes>([]); // Stores the selected value(s)
  const [searchValue, setSearchValue] = useState(""); // Stores the value entered in the search input
  const [menuStyle, setMenuStyle] = useState<Record<string, number | string>>({
    width: "",
    top: "",
    bottom: "",
    left: "",
    // opacity: 0,
  });
  const searchRef = useRef<HTMLInputElement>(null); // Reference to the search input element
  const inputRef = useRef<HTMLDivElement>(null); // Reference to the custom select input element
  const optionInputRef = useRef<HTMLInputElement>(null); // Reference to the custom select input element

  const loadOptionsData = useCallback(() => {
    if (optionsList.length) {
      const data: OptionTypes = optionsList.map((value) => ({
        value: value,
        label: value,
      }));
      setOptionsData(data);
    } else if (options.length) {
      setOptionsData(options);
    }
  }, [optionsList, options]); // Memoizing with dependencies

  useEffect(() => {
    loadOptionsData();
  }, [loadOptionsData]); // Only include the memoized function

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef?.current.focus();
    }

    if (showMenu && inputRef.current) {
      const menuHeight = 288 + 80;
      const divEl = inputRef.current;
      const { width, left, top, y } = divEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate available space above and below the button
      const spaceAbove = top;
      // const spaceBelow = windowHeight - bottom;
      const spaceBelow = windowHeight - y;

      // console.log("WinH: ", windowHeight);
      // console.log("clientY: ", y);
      // console.log("TOP : ", top);
      // console.log("SpaceBelow: ", spaceBelow);
      // console.log(divEl.getBoundingClientRect());
      // // console.log("WinH: ", windowHeight)

      // Set dropdown position based on available space
      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        // setMenuStyle({
        //   bottom: 88,
        //   top: "",
        //   opacity: 1,
        // });
        setMenuStyle({
          width,
          left,
          bottom: spaceBelow,
          top: "",
          opacity: 1,
        });
        //  setDropdownPosition("top");
        // console.log(">>> TOP <<<");
      } else {
        // console.log(">>> BUTTOM <<<");
        // setMenuStyle({
        //   bottom: "",
        //   opacity: 1,
        // });
        setMenuStyle({
          width,
          left,
          top: top + 40,
          bottom: "",
          opacity: 1,
        });
        //  setDropdownPosition("bottom");
      }
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef?.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleOnChange = (options: OptionTypes) => {
    if (multiple) {
      onOptionChange?.(options);
    } else if (optionInputRef.current) {
      // const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      //   window.HTMLInputElement.prototype,
      //   "value"
      // )!.set;
      // nativeInputValueSetter!.call(optionInputRef, "");
      // optionInputRef.current?.dispatchEvent(
      //   new Event("change", { bubbles: true })
      // );
      // onChange(new Event("change", { bubbles: true })
      optionInputRef!.current.value = options[0].value as string;
      // return onChange?.(options);
    }
    // onChange?.(options[0].value as string);
    onOptionChange?.(options[0].value as string);
  };
  // const handleInputClick = (e: MouseEvent) => {
  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedOption.length) {
      return value || placeholder;
    }
    // if (!selectedValue || selectedValue.length === 0) {
    //   return placeholder;
    // }
    if (multiple) {
      return (
        <div className="lcg_dropdown-tags flex gap-1 flex-wrap">
          {selectedOption.map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              className="lcg_dropdown-tag-item bg-danger rounded-md p-1 text-xs font-bold text-white flex gap-1">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="lcg_dropdown-tag-close  bg-dark flex-center rounded-full">
                <BiX fontSize={14} />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedOption[0].label;
  };

  const removeOption = (option: OptionProps) => {
    return selectedOption.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e: MouseEvent<HTMLSpanElement>, option: OptionProps) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedOption(newValue);
    handleOnChange(newValue);
  };

  const onItemClick = (option: OptionProps) => {
    let newValue;
    if (multiple) {
      if (selectedOption.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedOption, option];
      }
    } else {
      newValue = [option];
    }
    setSelectedOption(newValue);
    handleOnChange(newValue);
  };

  const isSelected = (option: OptionProps) => {
    if (multiple) {
      return selectedOption.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedOption) {
      return false;
    }

    if (!selectedOption[0]) return false;
    return selectedOption[0].value === option.value;
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // const search = e.target.value;
    // if (search) {
    //   setOptionsData(
    //     options.filter(
    //       (option) =>
    //         option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    //     )
    //   );
    // } else {
    //   loadOptionsData();
    // }
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return optionsData;
    }

    return optionsData.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  const handleOptionToString = (): string => {
    if (!selectedOption.length) {
      return value.toString();
    }
    const values: string[] = selectedOption.map((opt) => opt.value + "");
    return values.join(",");
  };

  return (
    <div className="lcg_custom--dropdown-container relative z-50">
      {/* label */}
      <div
        className="control w-full lcg_dropdown-input"
        data-js={label}
        ref={inputRef}
        onClick={handleInputClick}>
        <div className="cursor-pointer">
          {/* Input */}
          {label && (
            <label
              className="capitalize block mb-2 text-sm font-bold"
              htmlFor={id || name}>
              {label}
            </label>
          )}
          {/* input */}
          <div className="lcg_dropdown-input relative flex-center">
            <div
              className={`lcg_dropdown-selected-value f__input w-full ${
                !selectedOption.length ? "text-muted" : ""
              } ${className}`}
              // {...others}

              // {others}
              style={{ paddingRight: "30px", ...style }}>
              {getDisplay()}
            </div>

            <div className="lcg_dropdown-tools absolute right-2">
              <div className="lcg_dropdown-tool">
                <BiChevronDown
                  fontSize={20}
                  className={`transition-transform duration-300 ${
                    showMenu ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div data-label="dropdown">
              <input
                className={`size-0 scale-0`}
                ref={optionInputRef}
                name={name}
                readOnly
                id={id || name}
                // onChange={() => handleOnChange(selectedOption)}
                // onChange={onChange}
                // onKeyUp={onChange}
                {...others}
                value={handleOptionToString()}
              />
            </div>
          </div>

          {hint && <div className="mt-0.5 text-sm opacity-80">{hint}</div>}
        </div>

        {error && (
          <p className="help mt-1 text-xs text-red" data-js="error-message">
            {error}
          </p>
        )}
      </div>
      {/* other */}

      {showMenu && (
        <div
          className={`lcg_dropdown-menu fixed bg-white text-dark w-full _min-w-max translate-y-1 mt-2 p-2 rounded-lg shadow-md _min-h-14 max-h-72 border border-muted/50 overflow-auto z-[20000] block`}
          style={menuStyle}>
          {isSearchable && (
            <div className="sticky top-0 bg-white lcg_search-box flex-center">
              <input
                className="f__input form-control"
                placeholder="Search list"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
              <div className="lcg_dropdown-tools absolute right-4">
                <div className="lcg_dropdown-tool">
                  <BiSearch />
                </div>
              </div>
            </div>
          )}
          <div data-list className="mt-2">
            {/* {(searchValue ? getOptions() : optionsData).map((option) => ( */}
            {/* {optionsData.map((option) => ( */}
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`w-full lcg_dropdown-item cursor-pointer py-2 px-3 transition-colors hover:bg-muted/5 text-dark rounded-md font-semibold text-sm ${
                  isSelected(option) &&
                  "selected font-bold bg-primary/10 text-primary"
                }`}>
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormCustomSelect;
