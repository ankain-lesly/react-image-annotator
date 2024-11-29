import { FileProps } from "@/components/inputs/file-input-handler";
import { Label } from "../../new-project/label-manager";
import {
  Layer,
  Stage,
  Image as KonvaImage,
  Text,
  Transformer,
} from "react-konva";
import { Fragment } from "react/jsx-runtime";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { loadImageBlob, mergeAnnotations } from "@/lib/utils";
import toast from "react-hot-toast";
import ShapeRenderer from "./render-shape";

interface Props {
  image: FileProps;
  label: Label | null;
  labels: Label[];
  shape: AnnotationShape;
  annotations: AnnotationProps[];
  setAnnotations: Dispatch<SetStateAction<AnnotationProps[]>>;
}

const ImageAnnotator = forwardRef<any, Props>(
  ({ image, label, labels, shape, annotations, setAnnotations }, ref) => {
    const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(
      null
    );
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
    const [drawing, setDrawing] = useState(false);
    // const stageRef = useRef<any>(null);
    const trRef = useRef<any>(null);
    const [newAnnotation, setNewAnnotation] = useState<AnnotationProps | null>(
      null
    );

    useEffect(() => {
      const img = new window.Image();
      img.src = loadImageBlob(image);
      img.onload = () => {
        setStageSize({
          width: Math.min(img.width, 800),
          height: Math.min(img.height, 600),
        });
        setLoadedImage(img);
      };
    }, [image]);

    // TODO: Duplicate Key >> Duplicate Element on render
    const handleMouseDown = (e: any) => {
      // console.log("LOG: Mouse Down");

      if (!label) return toast("Select a label to draw");
      const { x, y } = e.target.getStage().getPointerPosition();

      setDrawing(true);
      // setNewAnnotation(null)
      setNewAnnotation({
        id: Date.now().toString(),
        x,
        y,
        width: 0,
        height: 0,
        shape,
        labelId: label.id,
        imageId: image.id,
      });
    };

    const handleMouseMove = (e: any) => {
      // console.log("LOG: Mouse Move");
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
      // console.log("LOG: Mouse up");
      if (!drawing || !newAnnotation) return;
      if (newAnnotation.width < 9 || newAnnotation.height < 9) return;
      if (annotations.find((a) => a.id == newAnnotation.id)) return;
      setDrawing(false);
      setAnnotations((prev) =>
        mergeAnnotations([...prev, ...annotations, newAnnotation])
      );
      setNewAnnotation(null);
    };

    const handleTransformEnd = (e: any) => {
      // console.log("LOG: Transform End");

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

    return (
      <section className="section-p h-[calc(100vh-60px)] flex-center">
        <div className="container-x">
          <div className="w-max max-w-full mx-auto">
            <h4 className="text-lg mb-2" style={{ color: label?.color }}>
              {label?.name}
            </h4>
            <div
              className="rounded-3xl border-4 overflow-auto"
              style={{ borderColor: label?.color }}>
              <Stage
                width={stageSize.width}
                height={stageSize.height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                // TODO: get segments
                ref={ref}>
                <Layer>
                  {loadedImage && (
                    <KonvaImage
                      image={loadedImage}
                      width={stageSize.width}
                      height={stageSize.height}
                    />
                  )}
                  {annotations.map((ann) => (
                    <Fragment key={ann.id}>
                      {/* <Rect
                    id={ann.id}
                    x={ann.x}
                    y={ann.y}
                    width={ann.width}
                    height={ann.height}
                    stroke={
                      labels.filter((l) => l.id == ann.labelId).pop()?.color
                    }
                    strokeWidth={2}
                    onTransformEnd={handleTransformEnd}
                  /> */}
                      <ShapeRenderer
                        shape={ann.shape}
                        id={ann.id}
                        x={ann.x}
                        y={ann.y}
                        width={ann.width}
                        height={ann.height}
                        stroke={
                          labels.filter((l) => l.id == ann.labelId).pop()?.color
                        }
                        onTransformEnd={handleTransformEnd}

                        // TODO: Not draggable
                        // draggable
                        // TODO:
                        // onClick={() => selectShape(ann.id)}
                        // onTap={() => selectShape(ann.id)}
                      />
                      <Text
                        text={
                          labels.filter((l) => l.id == ann.labelId).pop()?.name
                        } // Assuming `ann` has a `label` property for the text
                        x={ann.x + ann.width / 2} // Center the text horizontally
                        y={ann.y - 20} // Position the text above the rectangle
                        fontSize={14}
                        fill={
                          labels.filter((l) => l.id == ann.labelId).pop()?.color
                        }
                        // align="center"
                        // verticalAlign="middle"
                        offsetX={ann.width / 2} // Center the text based on its width
                      />
                    </Fragment>
                  ))}
                  {newAnnotation && (
                    <Fragment>
                      {/* <Rect
                    x={newAnnotation.x}
                    y={newAnnotation.y}
                    width={newAnnotation.width}
                    height={newAnnotation.height}
                    stroke="blue"
                    strokeWidth={2}
                  /> */}
                      <ShapeRenderer
                        x={newAnnotation.x}
                        y={newAnnotation.y}
                        width={newAnnotation.width}
                        height={newAnnotation.height}
                        stroke="blue"
                        shape={newAnnotation.shape}
                        id={newAnnotation.id}
                        onTransformEnd={handleTransformEnd}

                        // TODO: Not draggable
                        // draggable
                        // TODO:
                        // onClick={() => selectShape(ann.id)}
                        // onTap={() => selectShape(ann.id)}
                      />
                    </Fragment>
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
          </div>
        </div>
      </section>
    );
  }
);

export default ImageAnnotator;
