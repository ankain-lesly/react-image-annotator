import { IconFile } from "@/assets";
import { Link } from "react-router-dom";

export default function ProjectCard(props: ProjectProps) {
  return (
    <div>
      <div className="product hover:shadow-lg rounded-lg border group border-muted">
        <Link
          to={`/workspace/${props.projectId}`}
          className="flex-center overflow-hidden bg-muted">
          <div className="h-36 w-full relative p-4">
            <img
              src={IconFile}
              alt={props.name}
              className="img-cover group-hover:scale-110 transition-transform duration-100"
            />
          </div>
        </Link>
        <div className="space-y-1 p-4">
          <h5 className="text-sm">{props.name}</h5>
          <div className="flex gap-2 items-center">
            <p className="text-xs">Images: {props.images.length}</p>
            <span className="size-1 bg-warning rounded-full"></span>
            <p className="text-xs">Labels: {props.labels.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
