"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import LabelManagement from "@/screens/new-project/label-management";
import ImageAnnotation from "@/components/ImageAnnotation";

export default function AnnotatorPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Annotation Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select an image to annotate</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload onImageSelect={setSelectedImage} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Labels</CardTitle>
            <CardDescription>
              Create and manage annotation labels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LabelManagement labels={labels} setLabels={setLabels} />
          </CardContent>
        </Card>
      </div>
      {selectedImage && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Image Annotation</CardTitle>
            <CardDescription>
              Draw annotations on the selected image
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <h1>Image Annotation Layer</h1> */}
            <ImageAnnotation image={selectedImage} labels={labels} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
