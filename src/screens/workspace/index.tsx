import { MainHeader } from "@/components/menus/main-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BiBulb } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ListWorkspacesPage() {
  return (
    <div>
      <MainHeader />

      <section className="section-p">
        <div className="container-x">
          {/* Head */}
          <div className="flex mb-8 items-center justify-between">
            <h2 className="text-xl">My workspaces</h2>
            <Button asChild>
              <Link to={"/new-project"} className="flex-center gap-2 font-bold">
                New <PlusCircle />
              </Link>
            </Button>
          </div>

          {/* Steps */}
          <header className="border-b border-b-muted/20 mb-4">
            <Button variant={"ghost"} className="font-bold">
              Recent
            </Button>
            <Button variant={"ghost"} className="text-muted">
              Popular
            </Button>
          </header>

          {/* List Workspaces */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Item */}
            <Link
              to={"/workspace/project-id"}
              className="flex items-center bg-dark-l p-2 rounded-lg gap-2 hover:opacity-60">
              <div className="size-8 border border-muted rounded-full flex-center">
                <BiBulb />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm">Demo work space</h5>
                <div className="flex gap-2 items-center">
                  <p className="text-xs">3 images</p>
                  <span className="size-1 bg-warning rounded-full"></span>
                  <p className="text-xs">3 labels</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
