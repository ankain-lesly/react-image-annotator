```tsx
import { useEffect, useState } from "react";
import ModalOverlay from "./modal-overlay";

interface Props {
  children: (props: ModalPropCloseModal) => JSX.Element;
  // closeModal: () => void;
  options: ModalPropTypes;
}
const ModalWrapperMenu = ({
  // closeModal,
  options,
  children: ModalBody,
}: Props) => {
  const [menuPosition, setMenuPosition] = useState({ right: 0, top: 0 });

  const getMousePosition = () => {
    const { clientX, clientY } = window.document;
    // setting action

    // positioning menu
    const right = window.innerWidth - clientX - 30;
    // let top = window.innerHeight - clientY;
    const top = clientY + window.scrollY;
    // if (clientX > window.innerHeight) top = window.innerHeight + clientY;

    // console.log("WinW: ", window.innerWidth, "WinH", window.innerHeight);
    // console.log("CliX: ", clientX, "CliY", clientY);
    // console.log("PosR: ", right, "PosT", top);
    // console.log("scrollY: ", window.scrollY);

    setMenuPosition({ right, top });
  };

  useEffect(() => {
    getMousePosition();
  }, []);
  return (
    <div className="fixed z-[1000] inset-0 top-0 left-0">
      <ModalOverlay onClick={options.closeModal} />
      <div
        className=""
        aria-modal="true"
        tabIndex={1}
        style={{ ...menuPosition }}>
        {/* BLOCK: */}
        {/* <div className="absolute z-50" onClick={() => setIsMenu(null)}> */}
        <div className="absolute z-50">
          <ul className="actions min-w-40 bg-white shadow-lg p-4 rounded-lg flex items-start flex-col gap-3 text-left w-max">
            <li className="list-item list-disc ml-3">
              <button>Button</button>
            </li>

            <li className="list-item list-disc ml-3">
              <button>Button</button>
            </li>
          </ul>
        </div>
        {/* BLOCK: */}
        {<ModalBody {...options} />}
      </div>
    </div>
  );
};

export default ModalWrapperMenu;
```
