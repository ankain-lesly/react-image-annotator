import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label as UILabel } from "@/components/ui/label";
import { BiTrash } from "react-icons/bi";
import { Loader, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getRandomColor } from "@/lib/utils";

export interface Label {
  id: number;
  name: string;
  color: string;
}

interface LabelManagerProps {
  labels: Label[];
  setLabels: Dispatch<SetStateAction<Label[]>>;
}

export function LabelManager({ labels, setLabels }: LabelManagerProps) {
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#00ff00");

  const handleCreateLabel = () => {
    if (!newLabelName.trim()) return;
    if (labels.filter((l) => l.name == newLabelName.trim()).length > 0)
      return toast("Label already exits..");
    setLabels((prev) => [
      {
        id: Date.now() + 1,
        name: newLabelName,
        color: newLabelColor,
      },
      ...prev,
    ]);
    setNewLabelName("");
  };

  const deleteLabel = (id: number) => {
    setLabels(labels.filter((l) => l.id != id));
    toast.success("Label removed ✔");
  };

  const updateLabelColor = (id: number) => {
    setLabels(
      labels.map((l) => (l.id == id ? { ...l, color: getRandomColor() } : l))
    );
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg">Create label</h3>
      {/*  */}
      <div className="py-2 space-y-2">
        <UILabel>New Label</UILabel>
        <div className="flex gap-2">
          <Input
            type="color"
            value={newLabelColor}
            onChange={(e) => setNewLabelColor(e.target.value)}
            className="w-20 border-none bg-dark-l"
          />
          <Input
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && handleCreateLabel()}
            placeholder="Label name"
          />
          <Button
            onClick={handleCreateLabel}
            className="flex-center gap-2 font-bold">
            <PlusCircle className="scale-150" />
          </Button>
        </div>
      </div>

      {labels.length > 0 && (
        <div className={`flex flex-col gap-2`}>
          <ShowLabels
            updateLabelColor={updateLabelColor}
            deleteLabel={deleteLabel}
            labels={labels}
          />
        </div>
      )}
    </div>
  );
}

interface ShowProps {
  labels: Label[];
  deleteLabel: (id: number) => void;
  updateLabelColor: (id: number) => void;
}
// _min-h-[186px]
const ShowLabels = ({ labels, deleteLabel, updateLabelColor }: ShowProps) => {
  return labels.map((label, i) => (
    <div
      key={i}
      className="flex items-center gap-2 relative bg-dark-l rounded-xl overflow-hidden">
      <div
        className="cursor-pointer w-10 h-8 flex-center"
        style={{ backgroundColor: label.color }}
        onClick={() => updateLabelColor(label.id)}>
        <Loader className="w-4" />
      </div>
      {/* <img src={loadImageBlob(img)} className="img-cover" alt="product image" /> */}
      <p className="flex-1 line-clamp-1">{label.name}</p>
      <button
        type="button"
        className="mr-2 size-6 flex-center rounded-md bg-white text-dark border hover:opacity-50"
        onClick={() => deleteLabel(label.id)}>
        <BiTrash />
      </button>
    </div>
  ));
};
