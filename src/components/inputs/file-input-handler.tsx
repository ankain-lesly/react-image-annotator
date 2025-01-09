import { ChangeEvent, useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";

export type FileProps = File & {
  id?: number;
  file_path?: string;
  createdAt?: string;
};
// export type FileProps  = {
//   size: number;
//   name: string;
//   type: string;
// };

export type FileModes = "single" | "multiple";

interface Props {
  setFiles: (files: FileProps[]) => void;
  mode: FileModes;
  maxSize?: number;
  fileTypes?: string[];
  theme?: "dark" | "light";
  validation?: "strick" | "select";
}

const FileInputHandler = ({
  setFiles,
  mode,
  maxSize,
  theme = "light",
  fileTypes,
}: Props) => {
  const [error, setError] = useState("");
  const [activeDrop, setActiveDrop] = useState(false);

  const handleFiles = (
    files: Array<Omit<FileProps, "id"> & { id?: number }>
  ) => {
    let _error = "";
    if (!files.length) return; // alert("Invalid files. Try again");

    const newFiles: FileProps[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      if (maxSize && !validFileSize(file.size)) {
        _error = "File size exceeded";
      }
      if (!validFileType(file.name)) {
        _error = "File not supported.";
        continue;
      }

      file.id = Date.now() + i;
      newFiles.push(file as FileProps);
    }

    setError(_error);
    setFiles(newFiles);
    // console.log(newFiles);

    // if (_error) {
    // } else {
    //   // setFiles([...files]);
    //   // TODO: remove on actual upload
    //   // setFiles(
    //   //   [...files].map((file, i) => ({ ...file, id: Date.now() + `${i}` }))
    //   // );
    //   // [...files].map((file, i) => ({ ...file, id: Date.now() + `${i}` }))
    //   // console.log(files);
    //   const newData = [...files].map((f, i) => ({ ...f }));
    //   console.log(newData);
    //   setError("");

    //   // Date.now() +
    // }
  };

  const validFileSize = (size: number) => {
    return maxSize && size <= maxSize;
  };
  const validFileType = (name: string) => {
    if (!fileTypes) return true;
    const extension = "." + name.split(".").pop();
    return fileTypes?.includes(extension);
  };

  const handleInputChange = (event: ChangeEvent) => {
    const input = event.target as typeof event.target & {
      files: File[];
    };

    handleFiles(input.files);
  };

  // Handling Drag & Drop
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => (
      e.preventDefault(), setActiveDrop(true)
    );

    const handleDragLeave = () => setActiveDrop(false);
    // const handleDrop = (e) => {
    function handleDrop(e: DragEvent) {
      e.preventDefault();
      if (!e.dataTransfer?.files) return;
      const files = [...e.dataTransfer.files];
      const targetFiles = mode == "multiple" ? files : files.slice(0, 1);

      handleFiles(targetFiles);
      setActiveDrop(false);
    }
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  // CODE: Initial Validate
  if (!setFiles || !mode || !maxSize)
    return (
      <div className="text-muted p-4 border rounded-md">
        All params required
      </div>
    );

  return (
    <div className="overflow-hidden transition-transform duration-300 opacity-0 animate-inOpacity">
      {/* File Uploader */}
      <label htmlFor="FileTarget" title="Upload Asset">
        <div
          className={`file-zone__area hover:border-warning hover:border-solid group transition-all duration-300 border-[2px] px-10 py-5 rounded-xl flex-center flex-col gap-3 text-center relative cursor-pointer ${
            activeDrop
              ? "border-warning border-solid"
              : "border-muted border-dashed"
          } ${theme == "dark" ? "bg-dark text-white" : ""}`}>
          <span
            className={`group-hover:text-warning text-muted transition ${
              activeDrop ? "text-warning" : ""
            }`}>
            <BsCloudUpload fontSize={50} />
          </span>
          <div>
            {/* <span className="text-warning">Drop</span> */}
            <h3 className="text-lg">
              {activeDrop ? "Drop Assets" : "Drag & Drop"}
            </h3>
            <p className="status-message opacity-80">
              OR <span className="text-success font-bold">browse</span>
            </p>
            <p className="text-muted capitalize text-sm absolute top-2 right-2">
              {mode}
            </p>
          </div>
          {error && (
            <p
              className={`file-zone__message text-danger text-sm absolute bottom-1 ${
                theme == "dark" ? "bg-dark text-white" : ""
              }`}>
              {error}
            </p>
          )}
        </div>
      </label>
      <input
        className="hidden"
        type="file"
        id="FileTarget"
        accept={fileTypes?.join(",") || "*"}
        onChange={handleInputChange}
        multiple={mode == "multiple" ? true : false}
      />
    </div>
  );
};

export default FileInputHandler;
