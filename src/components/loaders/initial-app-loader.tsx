// import AppSVGLogo from "../../assets/app-logo";
// import { AnimatePresence, motion } from "framer-motion";

import { IconFile } from "@/assets";
import Image from "@/components/ui/image";

export default function InitialPageLoader() {
  return (
    <div className="fixed z-[200000] inset-0 bg-dark-l flex-center flex-col gap-20">
      <div className="flex-center relative">
        <div className="w-10 h-10 flex-center absolute animate-pulse">
          <Image src={IconFile} alt="app logo" />
        </div>
        <div
          className="w-24 h-24 rounded-full border-2 border-transparent border-b-muted/50 absolute animate-spin hover:duration-[5s]"
          style={{ animationDuration: "2s" }}
        />
      </div>
      <div className="labels text-center text-light w-full__bottom-4">
        <h5 className="text-danger">Image Annotator</h5>
        <p className="text-xs font-bold text-muted">
          Annotate With Creative Clicks <br /> (Computer Vision)
        </p>
      </div>
    </div>
    // </motion.div>
    // </AnimatePresence>
  );
}
