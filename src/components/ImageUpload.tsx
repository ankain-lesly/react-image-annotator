import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast"

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  // const { toast } = useToast()
  const toast = (toast: any) => {
    console.log(toast);
    alert("New Toast: " + toast.title);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      //  const newImage: ImageData = {
      //    id: uuidv4(),
      //    url,
      //    filename: file.name,
      //    width: img.width,
      //    height: img.height,
      //  };
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // onImageSelect(imageUrl);
    // onImageSelect(URL.createObjectURL(selectedFile as Blob));
  };

  const handleDefaultImage = async () => {
    // onImageSelect(IconFile);
    onImageSelect("https://konvajs.org/assets/yoda.jpg");
    // onImageSelect();
    // console.log(IconFile);
  };

  const handleUpload2 = async () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload/image", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          const imageUrl = `/uploads/${data.filename}`;
          onImageSelect(imageUrl);
          toast({
            title: "Image uploaded successfully",
            description: "You can now annotate the image.",
          });
        } else {
          throw new Error(data.message || "Upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Upload failed",
          description:
            "There was an error uploading the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button
        onClick={handleUpload}
        className="w-full"
        disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
      <Button
        onClick={handleDefaultImage}
        variant={"outline"}
        className="w-full">
        Use Default Image
      </Button>
    </div>
  );
}
