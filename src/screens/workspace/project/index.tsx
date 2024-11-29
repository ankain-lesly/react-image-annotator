import { ProjectHeader } from "@/components/menus/project-header";
import { Button } from "@/components/ui/button";
import { Check, Images } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "../../new-project/label-manager";
import ImageAnnotator from "./image-annotator";
import { useContextProvider } from "@/store/context-provider";
import { useNavigate } from "react-router-dom";
import { FileProps } from "@/components/inputs/file-input-handler";
import { cn, downloadDataURI, getCOCOData, loadImageBlob } from "@/lib/utils";
import toast from "react-hot-toast";

export default function WorkspacePage() {
  const { setModal, project } = useContextProvider();
  const [labels, setLabels] = useState<Label[]>([]);
  const [images, setImages] = useState<FileProps[]>([]);
  const [activeLabel, setActiveLabel] = useState<Label | null>(null);
  const [activeImage, setActiveImage] = useState<FileProps | null>(null);
  const [shape, setShape] = useState<AnnotationShape>("rectangle");
  const navigate = useNavigate();
  const stageRef = useRef<any>(null);

  const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);

  const handleLoadImages = () => {
    setModal({
      type: "bottom_sheet_mobile",
      label: "Select next image",
      content: () => (
        <div className={`w-full overflow-auto`}>
          <div className={`flex gap-2  w-max`}>
            {images.map((img, i) => (
              <ShowImages
                key={i}
                img={img}
                handleClick={(img) => {
                  setActiveImage(img);
                  setModal(null);
                }}
                className="max-w-40"
                isAnnotated={
                  annotations.filter((a) => a.imageId == img.id).length > 0
                }
              />
            ))}
          </div>
        </div>
      ),
      options: {
        message: "You don't have any work available!!",
      },
    });
  };

  useEffect(() => {
    if (!project) {
      setModal({
        label: "Project Status",
        type: "alert",
        onCloseModal: () => {
          navigate("/new-project");
          setModal(null);
        },
        options: {
          message: "You don't have an active workspace available!!",
        },
      });
    } else {
      setImages(project.images);
      setLabels(project.labels);

      setModal({
        type: "bottom_sheet_mobile",
        label: "Select an image",
        closeBtn: false,
        content: () => (
          <div className={`flex gap-2 flex-wrap`}>
            {project.images.map((img, i) => (
              <ShowImages
                key={i}
                img={img}
                className="max-[320px]:w-[40%] max-[320px]:min-w-20"
                handleClick={(img) => {
                  setActiveImage(img);
                  setModal(null);
                }}
              />
            ))}
          </div>
        ),
        onCloseModal: () => {
          // CODE: override default modal close action
        },
      });
    }
  }, []);

  // TODO: create function filter annotations
  const handleExport = (type: AnnotationType) => {
    getCOCOData(annotations, images, labels, true);

    toast("Downloading annotation " + type.toLowerCase());
  };

  const handleDownloadImage = (withAnnotations?: boolean) => {
    const stage = stageRef.current as any;
    if (!stage || !activeImage) return;

    if (withAnnotations) {
      const dataURL = stage.toDataURL();
      downloadDataURI(dataURL, "annotated_image.png");
    } else {
      // TODO: Convert image file to blob
      downloadDataURI(loadImageBlob(activeImage), "project_image.png");
    }

    toast("Your image is being downloaded..");
  };
  // CODE: handleExport
  // CODE: handleImport
  // CODE: handleDownloadImage >> withAnnotations
  // CODE: >> select node layer >> drag and drop >>
  return (
    <div className="bg-dark min-h-screen">
      <ProjectHeader
        shape={shape}
        setShape={setShape}
        labels={labels}
        setActiveLabel={setActiveLabel}
        activeLabel={activeLabel}
        handleExport={handleExport}
        handleDownloadImage={handleDownloadImage}
      />

      {/* {activeImage && activeLabel ? ( */}
      {activeImage ? (
        <ImageAnnotator
          shape={shape}
          annotations={annotations.filter(
            (ann) => ann.imageId == activeImage.id
          )}
          setAnnotations={setAnnotations}
          image={activeImage}
          label={activeLabel}
          labels={labels}
          ref={stageRef}
        />
      ) : (
        <div className="section-p container-x flex-center">
          No Active Image.{" "}
        </div>
      )}

      {/* Div Actions */}
      <div>
        <Button
          variant={"secondary"}
          onClick={handleLoadImages}
          className="flex gap-2 rounded-full bg-dark-l fixed bottom-4 right-2 shadow-md ">
          <Images />
          <span className="font-bold">images</span>
        </Button>
      </div>
    </div>
  );
}

interface ShowProps {
  img: FileProps;
  isAnnotated?: boolean;
  handleClick: (img: FileProps) => void;
  className?: string;
}

// _min-h-[186px]
const ShowImages = ({
  img,
  handleClick,
  isAnnotated,
  className,
}: ShowProps) => {
  return (
    <div
      onClick={() => handleClick(img)}
      className={cn(
        "relative cursor-pointer min-w-32 h-40 flex-1 border-2 rounded-xl overflow-hidden",
        className
      )}>
      <img src={loadImageBlob(img)} className="img-cover" alt="product image" />

      {isAnnotated && (
        <div className="absolute top-1 right-1 size-6 bg-danger text-dark shadow-md rounded-full flex-center">
          <Check className="w-4" />
        </div>
      )}
    </div>
  );
};
