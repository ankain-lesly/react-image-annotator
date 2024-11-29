import { Stage, Layer, Rect, Circle, Ellipse, Line } from "react-konva";

interface ShapeProps {
  id?: number | string;
  shape: AnnotationShape;
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  points?: number[];
  fill?: string;
  stroke?: string;
  onTransformEnd?: (e: any) => void;
}

export default function ShapeRenderer({
  id,
  shape,
  radius = 50,
  points,
  ...others
}: ShapeProps) {
  const renderShape = () => {
    switch (shape) {
      case "rectangle":
        return <Rect id={id?.toString()} strokeWidth={3} {...others} />;
      case "circle":
        return (
          <Circle
            id={id?.toString()}
            strokeWidth={3}
            radius={radius}
            {...others}
          />
        );
      case "ellipse":
        return (
          <Ellipse
            id={id?.toString()}
            radiusX={others.width}
            radiusY={others.height}
            strokeWidth={3}
            {...others}
          />
        );
      case "polygon":
        return (
          <Line
            id={id?.toString()}
            strokeWidth={3}
            points={points}
            {...others}
            closed
          />
        );

      default:
        return null;
    }
  };

  return <>{renderShape()}</>;
}

// TODO:

export const DemoShapesApp = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <ShapeRenderer
          shape="rectangle"
          x={50}
          y={50}
          width={100}
          height={100}
          fill="red"
        />
        <ShapeRenderer
          shape="circle"
          x={200}
          y={150}
          radius={50}
          fill="blue"
          width={0}
          height={0}
        />
        <ShapeRenderer
          shape="ellipse"
          x={350}
          y={150}
          width={75}
          height={50}
          fill="green"
        />
        <ShapeRenderer
          shape="polygon"
          x={100}
          y={300}
          points={[100, 0, 40, 100, 0, 40, 60, 100]}
          fill="purple"
          width={0}
          height={0}
        />
      </Layer>
    </Stage>
  );
};
