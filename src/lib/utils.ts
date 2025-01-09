import { FileProps } from "@/components/inputs/file-input-handler";
import { Label } from "@/screens/new-project/label-manager";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { js2xml } from "xml-js";
import { saveAs } from "file-saver";

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
    images: images.map((img) => ({
      id: img.id as number,
      width: "-",
      height: "-",
      size: img.size,
      file_name: img.name,
      file_url: img.file_path as string,
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
        labelId: ann.labelId,
        imageId: ann.imageId,

        segmentation: ann.segmentation,
        area: ann.width * ann.height,
        is_crowd: 0,
      };
    }),
    labels: labels.map((label) => ({
      id: label.id,
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

// Define type for grouped annotations
interface GroupedAnnotations {
  [key: number]: AnnotationProps[];
}
export const convertAndDownloadPascalVOC = (cocoData: COCOFormatJSON) => {
  // Group annotations by image with proper typing
  const annotationsByImage = cocoData.annotations.reduce<GroupedAnnotations>(
    (acc, ann) => {
      if (!acc[ann.imageId]) {
        acc[ann.imageId] = [];
      }
      acc[ann.imageId].push(ann);
      return acc;
    },
    {}
  );

  // Create XML for each image
  cocoData.images.forEach((image, index) => {
    const imageAnnotations = annotationsByImage[image.id] || [];
    const labelMap = new Map(
      cocoData.labels.map((label) => [label.id, label.name])
    );

    // Create JavaScript object in PASCAL VOC format
    const pascalObject = {
      annotation: {
        folder: { _text: "images" },
        filename: {
          _text: image.file_url?.split("/").pop() || `image_${image.id}`,
        },
        path: { _text: image.file_url || "" },
        source: {
          database: { _text: cocoData.info.description },
        },
        size: {
          width: { _text: String(image.width || "800") },
          height: { _text: String(image.height || "600") },
          depth: { _text: "3" },
        },
        segmented: { _text: "0" },
        object: imageAnnotations.map((ann) => ({
          name: { _text: labelMap.get(ann.labelId) || "unknown" },
          pose: { _text: "Unspecified" },
          truncated: { _text: "0" },
          difficult: { _text: "0" },
          bndbox: {
            xmin: { _text: String(Math.round(ann.x)) },
            ymin: { _text: String(Math.round(ann.y)) },
            xmax: { _text: String(Math.round(ann.x + ann.width)) },
            ymax: { _text: String(Math.round(ann.y + ann.height)) },
          },
        })),
      },
    };

    // Convert to XML
    const xmlString = js2xml(pascalObject, { compact: true, spaces: 2 });

    // Download XML file
    const blob = new Blob([xmlString], { type: "text/xml;charset=utf-8" });
    saveAs(blob, `annotation_${index + 1}.xml`);
  });
};
