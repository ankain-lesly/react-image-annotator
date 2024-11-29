// import AppSVGLogo from "../../assets/app-logo";
// import { AnimatePresence, motion } from "framer-motion";

import { IconFile } from "@/assets";
import Image from "@/components/ui/image";

export default function InitialPageLoader() {
  return (
    // <AnimatePresence mode={"wait"}>
    //   <motion.div
    //     initial={{ opacity: 1 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     transition={{ duration: 0.5 }}
    //     data-label="app-transition"
    //     className="fixed z-[200000] inset-0 bg-dark-l flex-center"
    //     // style={styleHolder}
    //   >
    <div className="fixed z-[200000] inset-0 bg-dark-l flex-center">
      <div className="flex-center relative">
        <div className="w-10 h-10 flex-center absolute animate-pulse">
          <Image src={IconFile} alt="app logo" />
        </div>
        <div
          className="w-24 h-24 rounded-full border-2 border-transparent border-b-muted/50 absolute animate-spin hover:duration-[5s]"
          style={{ animationDuration: "2s" }}
        />
      </div>
      <div className="labels text-center text-light absolute w-full bottom-4">
        <h5 className="text-danger">annotator</h5>
        <p className="text-xs font-bold text-muted">Make Notes Prettier</p>
      </div>
    </div>
    // </motion.div>
    // </AnimatePresence>
  );
}
