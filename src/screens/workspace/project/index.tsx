import { ProjectHeader } from "@/components/menus/project-header";
import { Check, Images, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "../../new-project/label-manager";
import ImageAnnotator from "./image-annotator";
import { useContextProvider } from "@/store/context-provider";
import { useNavigate, useParams } from "react-router-dom";
import { FileProps } from "@/components/inputs/file-input-handler";
import {
  cn,
  convertAndDownloadPascalVOC,
  downloadDataURI,
  getCOCOData,
  loadImageBlob,
  mergeAnnotations,
} from "@/lib/utils";
import toast, { CheckmarkIcon } from "react-hot-toast";
import {
  useGetProject,
  useMutationUpdateProject,
} from "@/api/services/app-service";

export default function WorkspacePage() {
  const { setModal } = useContextProvider();
  const { projectId } = useParams();
  const { data, isLoading, error } = useGetProject(projectId as string);
  const { mutate, isPending } = useMutationUpdateProject(projectId as string);

  const [labels, setLabels] = useState<Label[]>([]);
  const [images, setImages] = useState<FileProps[]>([]);
  const [activeLabel, setActiveLabel] = useState<Label | null>(null);
  const [activeImage, setActiveImage] = useState<FileProps | null>(null);
  const [shape, setShape] = useState<AnnotationShape>("rectangle");
  const navigate = useNavigate();
  const stageRef = useRef<any>(null);

  const project = data?.data as ProjectProps;

  const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);

  const handleLoadGallery = () => {
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
    if (error) {
      setModal({
        label: "Project Status",
        type: "alert",
        onCloseModal: () => {
          navigate("/new-project");
          setModal(null);
        },
        options: {
          message: "Could not get active project for this workspace!!",
        },
      });
    } else if (project) {
      setImages(project.images);
      setLabels(project.labels);
      setAnnotations(project?.annotationData?.annotations || []);
      setActiveLabel(project.labels[0]);

      setModal({
        type: "bottom_sheet_mobile",
        label: "Gallery",
        closeBtn: false,
        onCloseModal: () => {
          toast("Select an image to continue");
        },
        content: () => (
          <div>
            <p className="mb-2 text-sm">Select image to annotate</p>
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
          </div>
        ),
      });
    }
  }, [project, projectId, error]);

  // TODO: create function filter annotations
  const handleExport = (type: AnnotationType) => {
    if (type == "PASCAL") {
      convertAndDownloadPascalVOC(getCOCOData(annotations, images, labels));
    }
    getCOCOData(annotations, images, labels, true);

    toast("Downloading annotation " + type.toLowerCase());
  };
  // Save Project
  const handleSaveProject = () => {
    const cocoData = getCOCOData(annotations, images, labels);
    const formData = new FormData();

    const blob = new Blob([JSON.stringify(cocoData, null, 2)], {
      type: "application/json",
    });
    const jsonFile = new File([blob], "annotation.json", {
      type: "application/json",
    });

    formData.append("annotation_file", jsonFile);

    if (isPending) return;

    mutate(formData, {
      onError: () => {
        toast.error("Could not save project.");
      },
      // onSuccess: () => {
      // },
    });
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

  // Loader
  if (isLoading || !project)
    return (
      <div className="p-20 h-screen flex-center gap-4 w-full">
        <Loader2 className="animate-spin" />
        <p>Loading Projects</p>
      </div>
    );

  // Project
  return (
    <div className="bg-dark min-h-screen">
      <ProjectHeader
        isSaving={isPending}
        shape={shape}
        setShape={setShape}
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
          setAnnotations={(data, save) => {
            setAnnotations((prev) => mergeAnnotations([...prev, ...data]));
            if (save) handleSaveProject();
            console.log("save: ", save);
          }}
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

      <div className="workspace-bottom-sheet w-screen fixed bottom-4 right-2">
        <div className="flex items-center justify-between w-full">
          {/* Labels */}
          <div></div>

          {/* Labels */}
          <div className="relative w-full">
            <div className="relative w-[calc(100vw-50px)] overflow-auto">
              <ul className="flex gap-2 w-max mx-auto bg-dark/20 p-2 rounded-full backdrop-blur-sm">
                {labels.map((label, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveLabel(label)}
                    className={`cursor-pointer`}>
                    <span
                      className="block size-8 rounded-full flex-center"
                      style={{ backgroundColor: label.color }}>
                      {activeLabel?.name == label.name && (
                        <CheckmarkIcon color="red" />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p
              className={`font-semibold w-max mx-auto absolute left-1/2 -translate-x-1/2 -bottom-3 text-center text-sm uppercase`}
              style={{ color: activeLabel?.color }}>
              {activeLabel?.name}
            </p>
          </div>
          {/* Gallery */}
          <button
            onClick={handleLoadGallery}
            className={`btn h-12 w-12 shrink-0 sm:w-auto sm:px-4 p-0 flex-center flex gap-2 items-center rounded-full bg-dark-l shadow-lg ${
              activeLabel ? "btn-primary" : " btn-dark-l"
            } `}>
            <Images className="shrink-0" />
            <span className="font-bold text-sm hidden sm:inline-block">
              Gallery
            </span>
          </button>
        </div>
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
      <img src={img.file_path} className="img-cover" alt="product image" />

      {isAnnotated && (
        <div className="absolute top-1 right-1 size-6 bg-danger text-dark shadow-md rounded-full flex-center">
          <Check className="w-4" />
        </div>
      )}
    </div>
  );
};
