import FileInputHandler, {
  FileProps,
} from "@/components/inputs/file-input-handler";
import { loadImageBlob } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";

interface Props {
  setImages: Dispatch<SetStateAction<FileProps[]>>;
  images: FileProps[];
}

export default function ImagesUploader({ setImages, images }: Props) {
  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i != index));
    toast.success("Image removed ✔");
  };
  return (
    <div className="">
      <h3 className="text-lg">Upload images</h3>
      <div className="py-2">
        <FileInputHandler
          maxSize={50000000}
          mode="multiple"
          fileTypes={[".jpeg", ".png", ".jpg", ".webp"]}
          setFiles={(files: FileProps[]) =>
            setImages((prev) => [...prev, ...files])
          }
        />
      </div>
      {images.length > 0 && (
        <div className={`flex gap-2 flex-wrap`}>
          <ShowImages deleteImage={deleteImage} images={images} />
        </div>
      )}
    </div>
  );
}

interface ShowProps {
  images: FileProps[];
  deleteImage: (i: number) => void;
}
// _min-h-[186px]
const ShowImages = ({ images, deleteImage }: ShowProps) => {
  return images.map((img, i) => (
    <div
      key={i}
      className="min-w-40 h-40 flex-1 relative border-2 rounded-xl overflow-hidden">
      <button
        type="button"
        className="absolute top-2 right-2 size-6 flex-center rounded-md bg-white text-dark border hover:opacity-50"
        onClick={() => deleteImage(i)}>
        <BiTrash />
      </button>
      <img src={loadImageBlob(img)} className="img-cover" alt="product image" />
    </div>
  ));
};
