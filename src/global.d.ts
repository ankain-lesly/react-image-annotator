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
    store: StoreProps;
    project: ProjectProps | null;
    setToken: (token?: string) => void;
    setStore: (props: StoreProps) => void;
    setModal: (modal: ModalPropsMain | null) => void;
    setUser: (user: UserProps | null) => void;
    setProject: (data: ProjectProps | null) => void;
  }
  // BLOCK: User Props

  type UserProps = {
    id: number;
    userId: string;
    name: string;
    email: string;
    type: UserTypes;
    phone: string;
    photo: string;
    username: string;
    emailVerified: string;
  };

  // Project Props
  interface ProjectProps {
    labels: Label[];
    images: FileProps[];
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
    // labelName: string;
    imageId: number;
    segmentation?: number[][]; // COCO format segmentation
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
      // width: number;
      // height: number;
      file_name: string;
      url: string;
      date_captured: string;
    }[];
    annotations: {
      shape: AnnotationShape;
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      label_id: number;
      image_id: number;
      segmentation?: number[][];
    }[];
    labels: {
      id: number;
      name: string;
      color: string;
    }[];
    // categories: Array<object>;
  }
}
