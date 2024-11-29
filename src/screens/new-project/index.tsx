import { FileProps } from "@/components/inputs/file-input-handler";
import { MainHeader } from "@/components/menus/main-header";
import { Button } from "@/components/ui/button";
import { Loader, PlusCircle } from "lucide-react";
import { useState } from "react";
import ImagesUploader from "./images-uploader";
import { Label, LabelManager } from "./label-manager";
import toast from "react-hot-toast";
import { useContextProvider } from "@/store/context-provider";
import { useNavigate } from "react-router-dom";

export default function NewProjectPage() {
  const { setProject, setModal } = useContextProvider();
  const [images, setImages] = useState<FileProps[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const router = useNavigate();

  const handleCreate = () => {
    if (!images.length || !labels.length)
      return toast("Both images and labels are required 🐭");

    setModal({
      label: <p className="text-warning">Annotator</p>,
      content: () => (
        <div className="p-8 gap-5 text-center flex-center">
          <p>Creating project</p>
          <Loader className="animate-spin" />
        </div>
      ),
    });

    setTimeout(() => {
      setModal(null);
      setProject({
        labels,
        images,
      });

      router("/workspace/project-id");
    }, 1000);
  };
  return (
    <div className="bg-dark min-h-screen">
      <MainHeader />

      <section className="section-p">
        <div className="container-x">
          {/* Head */}
          <div className="flex mb-8 items-center justify-between">
            <h2 className="text-xl">Create Project</h2>
            <Button
              onClick={handleCreate}
              // to={"/new-project"}
              // className="btn btn-primary p-5 rounded-full">
              className="flex-center gap-2 font-bold">
              Create <PlusCircle />
            </Button>
          </div>

          {/* Steps */}
          <header className="border-b border-b-muted/20 mb-4">
            <Button
              title="project info"
              variant={"ghost"}
              className="text-muted">
              Step One
            </Button>
            <Button
              title="upload project assets"
              variant={"ghost"}
              className="font-bold">
              Step Two
            </Button>
          </header>

          <div className="grid md:grid-cols-[auto_350px] gap-6">
            <ImagesUploader setImages={setImages} images={images} />
            <LabelManager setLabels={setLabels} labels={labels} />
          </div>
        </div>

        <div className="flex-center py-20">
          <button
            onClick={handleCreate}
            // to={"/new-project"}
            // className="btn btn-primary p-5 rounded-full">
            className="btn btn-primary rounded-full flex-center p-4 gap-2 font-bold">
            Proceed To Create <PlusCircle />
          </button>
        </div>
      </section>
    </div>
  );
}
