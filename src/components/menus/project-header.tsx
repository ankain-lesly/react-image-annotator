import {
  Check,
  ChevronLeft,
  CircleDot,
  Download,
  DownloadCloud,
  Edit2,
  File,
  Image,
  Layers,
  Menu,
  Redo,
  Save,
  Undo,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/screens/new-project/label-manager";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import {
  BiCaretRight,
  BiCircle,
  BiRectangle,
  BiShapeTriangle,
  BiX,
} from "react-icons/bi";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import ModalOverlay from "../modals/ui/modal-overlay";
import { useContextProvider } from "@/store/context-provider";
import { IconExchange } from "@/assets";

interface Props {
  labels: Label[];
  setActiveLabel: Dispatch<SetStateAction<Label | null>>;
  activeLabel: Label | null;
  shape: AnnotationShape;
  setShape: Dispatch<SetStateAction<AnnotationShape>>;
  // Actions
  handleExport: (a: AnnotationType) => void;
  handleDownloadImage: (a?: boolean) => void;
}

export function ProjectHeader({
  labels,
  setActiveLabel,
  activeLabel,
  setShape,
  shape,
  handleExport,
  handleDownloadImage,
}: Props) {
  const navigate = useNavigate();
  const { setModal } = useContextProvider();
  const [isSidebar, setIsSidebar] = useState(false);
  const handleLabel = (label: Label) => {
    setActiveLabel(label);
    // toast("Label changed to " + label.name);
  };

  const handleShape = (shape: AnnotationShape) => {
    setShape(shape);
    // toast("Shape changed to " + shape);
  };
  const handleBackClick = () => {
    setModal({
      type: "confirm",
      label: "",
      options: {
        message: (
          <div className="flex-center flex-col gap-4 my-2 text-center">
            <img src={IconExchange} alt="workspace icon" className="w-28" />
            <p>
              Are you sure you want to exit this workspace! changes might not be
              saved
            </p>
          </div>
        ),
        onComplete: () => {
          navigate("/workspace");
          setModal(null);
        },
      },
    });
  };

  return (
    <>
      <header>
        <nav className="bg-gray-800 text-white">
          <div className="container-x h-16 mx-auto flex justify-between items-center">
            <div className="flex-center gap-3">
              <Link
                to="#"
                onClick={handleBackClick}
                className="font-krona font-normal flex-center gap-2">
                <ChevronLeft />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="">
                  {activeLabel ? (
                    <div className="px-2 gap-2 flex-center py-1 border border-muted rounded-full bg-dark-l hover:opacity-60">
                      <div
                        className="size-4 rounded-full"
                        style={{ backgroundColor: activeLabel.color }}
                      />
                      <p className="flex-1 text-xs line-clamp-1">
                        {activeLabel.name}
                      </p>
                    </div>
                  ) : (
                    <Button asChild variant={"outline"}>
                      <p className="line-clamp-1">Select a label</p>
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={5}
                  className="z-50 bg-dark-l p-2 rounded-md shadow-md border border-muted/30">
                  {labels.map((label, i) => (
                    <div
                      key={i}
                      onClick={() => handleLabel(label)}
                      className={`cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-dark`}>
                      <div
                        className="size-2 rounded-full"
                        style={{ backgroundColor: label.color }}
                      />

                      {label.name}
                      <Check
                        className={`w-3 ${
                          activeLabel?.name != label.name ? "opacity-0" : ""
                        }`}
                      />
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Shapes */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    title="Choose shape"
                    variant={"ghost"}
                    className="p-0 hover:opacity-60">
                    <Layers fontSize={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={5}
                  className="z-50 bg-dark-l p-2 rounded-md shadow-md border border-muted/30">
                  <div
                    onClick={() => handleShape("rectangle")}
                    className={`cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-dark ${
                      shape == "rectangle" ? "text-muted" : ""
                    }`}>
                    <BiRectangle className="w-4" />
                    Rectangle
                  </div>
                  <div
                    onClick={() => handleShape("circle")}
                    className={`cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-dark ${
                      shape == "circle" ? "text-muted" : ""
                    }`}>
                    <BiCircle className="w-4" />
                    Circle
                  </div>
                  <div
                    onClick={() => handleShape("ellipse")}
                    className={`cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-dark ${
                      shape == "ellipse" ? "text-muted" : ""
                    }`}>
                    <CircleDot className="w-4" />
                    Ellipse
                  </div>
                  <div
                    // TODO: enable polygon shape
                    // onClick={() => handleShape("polygon")}
                    className={`opacity-20 text-warning cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-dark ${
                      shape == "polygon" ? "text-muted" : ""
                    }`}>
                    <BiShapeTriangle className="w-4" />
                    Polygon
                  </div>
                  <div
                    onClick={() => handleShape("rectangle")}
                    className={`cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-dark`}>
                    <BiCaretRight className="w-4" />
                    More shape
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="gap-2 hidden sm:flex-center">
              <Edit2 className="w-3" />
              <span className="inline-block font-bold text-sm line-clamp-1">
                Demo Project
              </span>
            </div>

            <nav className="actions flex gap-3">
              <Button
                title="Undo last action"
                className="px-1 hover:opacity-60"
                variant={"ghost"}>
                <Undo />
              </Button>
              <Button
                title="Redo last action"
                className="px-1 hover:opacity-60"
                variant={"ghost"}>
                <Redo />
              </Button>
              <Button
                onClick={() => setIsSidebar(true)}
                title="More action"
                className="p-2 hover:opacity-60">
                <Menu fontSize={20} />
              </Button>
            </nav>
          </div>
        </nav>
      </header>

      {/* SIde Bar */}
      {isSidebar && (
        <ModalOverlay onClick={() => setIsSidebar(false)} className="z-20" />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-10/12
           max-w-[280px] transition-all duration-300 z-50 ${
             isSidebar
               ? "translate-x-0 opacity-100"
               : "translate-x-full opacity-0"
           }`}>
        <div className={`opacity-0_ h-full`}>
          <nav
            // onCanPlay={}
            className={`h-full bg-dark text-light py-4 w-full flex flex-col justify-start`}
            id="mobile-menu">
            <button
              onClick={() => setIsSidebar(false)}
              className="flex justify-end p-4 ml-auto text-muted hover:text-danger transition">
              <BiX fontSize={28} />
            </button>
            <ul className="container-x text-sm">
              <li
                onClick={() => {}}
                className="p-2 flex gap-2 hover:opacity-50 cursor-pointer transition items-center">
                <Save className="w-4" />
                <p>Save Project</p>
              </li>
              <li
                onClick={() => handleDownloadImage()}
                className="p-2 flex gap-2 hover:opacity-50 cursor-pointer transition items-center">
                <Download className="w-4" />
                <p>Download original image</p>
              </li>
              <li
                onClick={() => handleDownloadImage(true)}
                className="p-2 flex gap-2 hover:opacity-50 cursor-pointer transition items-center">
                <Image className="w-4" />
                <p>Download annotated image</p>
              </li>
              <li
                onClick={() => handleExport("COCO")}
                className="p-2 flex gap-2 hover:opacity-50 cursor-pointer transition items-center">
                <DownloadCloud className="w-4" />
                <p>
                  Export annotations{" "}
                  <span className="text-warning block text-xs">
                    COCO Format
                  </span>
                </p>
              </li>
              <li
                onClick={() => handleExport("PASCAL")}
                className="p-2 flex gap-2 hover:opacity-50 cursor-pointer transition items-center">
                <File className="w-4" />
                <p>
                  Export annotations{" "}
                  <span className="text-warning block text-xs">Pascal VOC</span>
                </p>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-4 container-x">
              <Link
                to="#"
                className="btn w-full p-3 px-5 rounded-full btn-primary text-white text-sm">
                Save Changes
              </Link>
              <Link
                to="#"
                className="btn w-full p-3 px-5 rounded-full btn-danger text-white text-sm">
                Import Annotations
              </Link>
            </div>

            <div className="mt-auto bg-dark-l p-4 mx-4 rounded-xl shadow-md text-center">
              <h5 className="text-muted">Annotator</h5>
              <p className="text-warning opacity-80 mb-1 text-sm">
                Web Programming | Java
              </p>
              <h6>Group 2</h6>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
