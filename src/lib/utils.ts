import { FileProps } from "@/components/inputs/file-input-handler";
import { Label } from "@/screens/new-project/label-manager";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Image Blob
export const loadImageBlob = (file: FileProps) => {
  return URL.createObjectURL(file);
};

// Resize Image
export function getHeight(width: number, height: number, newWidth: number) {
  // Calculate the aspect ratio
  const aspectRatio = width / height;

  // Calculate the new height maintaining the aspect ratio
  return newWidth / aspectRatio;
}

// Random color
export const getRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};

export const mergeAnnotations = (
  annotations: AnnotationProps[]
): AnnotationProps[] => {
  const ids: Array<string> = [];
  const filter = [];
  for (const ann of annotations) {
    if (!ids.includes(ann.id)) {
      ids.push(ann.id);
      filter.push(ann);
    }
  }

  return filter;
};

// export interface ProjectActions {
//   downloadCOCO?: (
//     ann: AnnotationProps[],
//     images: FileProps[],
//     labels: Label[]
//   ) => void;
//   downloadImage?: (image: FileProps) => void;
// }
// export const projectActions: ProjectActions = {
//   downloadCOCO: exportToCOCO,
//   downloadImage: (image) => {
//     console.log(image);
//   },
// };
export function getCOCOData(
  annotations: AnnotationProps[],
  images: FileProps[],
  labels: Label[],
  download?: boolean
) {
  const cocoData: COCOFormatJSON = {
    info: {
      description: "Dataset description | Web Programming - Java Course",
      url: "http://example.com",
      version: "1.0",
      year: 2024,
      contributors: ["Lesly Chuo", "Anye Noel", "---"],
      date_created: Date().toLocaleString(),
      licenses: "---",
    },
    images: images.map((img, index) => ({
      id: index + 1,
      // width: img.width,
      // height: img.height,
      file_name: img.name,
      url: "api/annotations/user/image-uuid",
      date_captured: "2023-10-01T00:00:00",
    })),
    annotations: annotations.map((ann) => {
      return {
        shape: ann.shape,
        id: ann.id,
        x: ann.x,
        y: ann.y,
        width: ann.width,
        height: ann.height,
        label_id: ann.labelId,
        image_id: ann.imageId,

        segmentation: ann.segmentation,
        area: ann.width * ann.height,
        is_crowd: 0,
      };
    }),
    labels: labels.map((label, index) => ({
      id: index + 1,
      name: label.name,
      color: label.color,
    })),
  };

  if (download) {
    try {
      const blob = new Blob([JSON.stringify(cocoData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      downloadDataURI(url, "annotations_coco.json");
    } catch (error) {
      console.log(error);
    }
  }

  return cocoData;
}

export function downloadDataURI(uri: any, filename: string) {
  const link = document.createElement("a");
  link.href = uri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(uri);
}
