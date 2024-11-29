import { useState, useRef, useEffect, Fragment } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Transformer,
  Text,
} from "react-konva";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast"

interface Annotation {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface ImageAnnotationProps {
  image: string;
  // image: CanvasImageSource;
  labels: string[];
}

export default function ImageAnnotation({
  image,
  labels,
}: ImageAnnotationProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState<Annotation | null>(null);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const stageRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  // const { toast } = useToast()

  const toast = (obj: any) => {
    console.log(obj);
    alert("New Toast: Check console");
  };
  useEffect(() => {
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      setStageSize({
        width: Math.min(img.width, 800),
        height: Math.min(img.height, 600),
      });
      setLoadedImage(img);
    };
  }, [image]);

  const handleMouseDown = (e: any) => {
    if (!selectedLabel) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    setDrawing(true);
    setNewAnnotation({
      id: Date.now().toString(),
      x,
      y,
      width: 0,
      height: 0,
      label: selectedLabel,
    });
  };

  const handleMouseMove = (e: any) => {
    if (!drawing) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewAnnotation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        width: x - prev.x,
        height: y - prev.y,
      };
    });
  };

  const handleMouseUp = () => {
    if (!drawing || !newAnnotation) return;
    setDrawing(false);
    setAnnotations([...annotations, newAnnotation]);
    setNewAnnotation(null);
  };

  const handleExport = async () => {
    const cocoData = {
      images: [{ id: 1, file_name: image.split("/").pop() }],
      annotations: annotations.map((ann, index) => ({
        id: index + 1,
        image_id: 1,
        category_id: labels.indexOf(ann.label) + 1,
        bbox: [ann.x, ann.y, ann.width, ann.height],
        area: ann.width * ann.height,
        segmentation: [],
        iscrowd: 0,
      })),
      categories: labels.map((label, index) => ({
        id: index + 1,
        name: label,
        supercategory: "object",
      })),
    };

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([JSON.stringify(cocoData)], { type: "application/json" })
    );
    formData.append("imageFilename", image.split("/").pop() || "");

    try {
      const response = await fetch("/api/upload/annotation", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Annotations exported successfully",
          description: "The annotations have been saved on the server.",
        });
      } else {
        throw new Error(data.message || "Export failed");
      }
    } catch (error) {
      console.error("Error exporting annotations:", error);
      toast({
        title: "Export failed",
        description:
          "There was an error exporting the annotations. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          try {
            const importedData = JSON.parse(content);
            const importedAnnotations = importedData.annotations.map(
              (ann: any) => ({
                id: ann.id.toString(),
                x: ann.bbox[0],
                y: ann.bbox[1],
                width: ann.bbox[2],
                height: ann.bbox[3],
                label:
                  importedData.categories.find(
                    (cat: any) => cat.id === ann.category_id
                  )?.name || "",
              })
            );
            setAnnotations(importedAnnotations);
            toast({
              title: "Annotations imported successfully",
              description: "The imported annotations have been loaded.",
            });
          } catch (error) {
            console.error("Error parsing imported data:", error);
            toast({
              title: "Import failed",
              description:
                "There was an error importing the annotations. Please check the file format.",
              variant: "destructive",
            });
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    setAnnotations(
      annotations.map((ann) =>
        ann.id === node.id()
          ? {
              ...ann,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            }
          : ann
      )
    );
  };

  const handleDownloadImage = (withAnnotations: boolean) => {
    const stage = stageRef.current;
    if (!stage) return;

    if (withAnnotations) {
      // Download image with annotations
      const dataURL = stage.toDataURL();
      downloadURI(dataURL, "annotated_image.png");
    } else {
      // Download original image
      const link = document.createElement("a");
      link.href = image;
      link.download = image.split("/").pop() || "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (selectedId) {
      const selectedShape = stageRef.current.findOne(`#${selectedId}`);
      if (selectedShape && trRef.current) {
        trRef.current.nodes([selectedShape]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  if (!loadedImage) return <p>Image Not Ready</p>;

  console.log(annotations);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select onValueChange={(value) => setSelectedLabel(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a label" />
          </SelectTrigger>
          <SelectContent>
            {labels.map((label) => (
              <SelectItem key={label} value={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleExport}>Export Annotations</Button>
        <div>
          <Input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-annotations"
          />
          <Label htmlFor="import-annotations" className="cursor-pointer">
            <Button asChild>
              <span>Import Annotations</span>
            </Button>
          </Label>
        </div>
        <Button onClick={() => handleDownloadImage(false)}>
          Download Original Image
        </Button>
        <Button onClick={() => handleDownloadImage(true)}>
          Download Annotated Image
        </Button>
      </div>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={stageRef}>
        <Layer>
          <KonvaImage
            image={loadedImage}
            width={stageSize.width}
            height={stageSize.height}
          />
          {annotations.map((ann) => (
            <Fragment key={ann.id}>
              <Rect
                key={ann.id}
                id={ann.id}
                x={ann.x}
                y={ann.y}
                width={ann.width}
                height={ann.height}
                stroke="red"
                strokeWidth={2}
                draggable
                onClick={() => selectShape(ann.id)}
                onTap={() => selectShape(ann.id)}
                onTransformEnd={handleTransformEnd}
              />
              <Text
                text={ann.label} // Assuming `ann` has a `label` property for the text
                x={ann.x + ann.width / 2} // Center the text horizontally
                y={ann.y - 20} // Position the text above the rectangle
                fontSize={16}
                fill="black"
                align="center"
                verticalAlign="middle"
                offsetX={ann.width / 2} // Center the text based on its width
              />
            </Fragment>
          ))}
          {newAnnotation && (
            <Rect
              x={newAnnotation.x}
              y={newAnnotation.y}
              width={newAnnotation.width}
              height={newAnnotation.height}
              stroke="blue"
              strokeWidth={2}
            />
          )}
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
