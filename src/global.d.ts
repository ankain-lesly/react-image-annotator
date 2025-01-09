import { ReactElement } from "react";
import { Label } from "./screens/new-project/label-manager";
import { FileProps } from "./components/inputs/file-input-handler";

export {};

declare global {
  type UserTypes = "user" | "admin" | "user|admin";

  type StoreProps = {
    theme: "light" | "dark";
    notifications: number;
  };

  // BLOCK: Modal

  type ModalChildrenTypes = {
    onComplete?: (data?: object | string | number) => void;
    data?: object;
    message?: string;
  };

  type ModalOptionTypes = {
    onComplete?: (data?: object | string | number) => void;
    data?: object;
    others?: object;
    message?: ReactNode;
    closeModal?: () => void;
  };

  interface ModalPropsSetup {
    closeModal: () => void;
    children: (props: ModalOptionTypes) => ReactElement;
  }

  type ModalTypes =
    | "default"
    | "confirm"
    | "alert"
    | "process"
    | "custom"
    | "bottom_sheet"
    | "bottom_sheet_mobile";
  interface ModalPropsMain {
    type?: ModalTypes;
    // content?: (props: ModalChildrenTypes) => JSX.Element;
    content?: (props: ModalOptionTypes) => JSX.Element;
    label: ReactNode;
    options?: ModalOptionTypes;
    className?: string;
    overlay?: boolean;
    closeBtn?: boolean;
    onCloseModal?: () => void;
  }

  type ModalProps = ModalPropsMain & ModalPropsSetup;

  // BLOCK(AppContext):
  interface ContextProps {
    modal: ModalPropsMain | null;
    user: UserProps | null;
    token: string | null;
    setToken: (token?: string) => void;
    setModal: (modal: ModalPropsMain | null) => void;
    setUser: (user: UserProps | null) => void;
  }
  // BLOCK: User Props

  type UserProps = {
    id: number;
    userId: string;
    name: string;
    email: string;
    username: string;
  };

  // Project Props
  interface ProjectProps {
    id: string; // Unique identifier for the project
    projectId: string; // Unique identifier for the project
    name: string; // Name of the annotation project
    description?: string; // Optional description of the project
    labels: Label[]; // Array of labels used for annotation
    images: FileProps[]; // Array of images to be annotated
    userId: string; // ID of the user who created the project
    status: "active" | "completed" | "archived"; // Status of the project
    imageCount: number; // Total number of images in the project
    annotationData?: COCOFormatJSON; // JSON: Array of annotations made on the images
    createdAt: string; // Timestamp for when the project was created
    updatedAt: string; // Timestamp for when the project was last updated
  }

  // BLOCK: Annotation
  type AnnotationType = "COCO" | "PASCAL";
  type AnnotationShape = "rectangle" | "circle" | "ellipse" | "polygon";
  interface AnnotationProps {
    shape: AnnotationShape;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    labelId: number;
    imageId: number;
    segmentation?: number[][]; // COCO format segmentation
    // labelName: string;
  }

  interface COCOFormatJSON {
    info: {
      description: string;
      url: string;
      version: string;
      year: number;
      contributors: string[];
      date_created: string;
      licenses: string;
    };
    images: {
      id: number;
      width: string;
      height: string;
      size: number;
      file_name: string;
      file_url: string;
      date_captured: string;
    }[];
    annotations: AnnotationProps[];
    labels: {
      id: number;
      name: string;
      color: string;
    }[];
    // categories: Array<object>;
  }
}
