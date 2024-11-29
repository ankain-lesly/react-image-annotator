import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface LabelManagementProps {
  labels: string[];
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LabelManagement({
  labels,
  setLabels,
}: LabelManagementProps) {
  const [newLabel, setNewLabel] = useState("");

  const handleAddLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel("");
    }
  };

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter((l) => l !== label));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter new label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <Button onClick={handleAddLabel}>Add Label</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <Badge
            key={label}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleRemoveLabel(label)}>
            {label} &times;
          </Badge>
        ))}
      </div>
    </div>
  );
}
