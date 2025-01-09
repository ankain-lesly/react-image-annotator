import { useGetProjects } from "@/api/services/app-service";
import { IconFile } from "@/assets";
import ProjectCard from "@/components/cards/project-card";
import { MainHeader } from "@/components/menus/main-header";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { useContextProvider } from "@/store/context-provider";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FolderOpen,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ListWorkspacesPage() {
  const { user } = useContextProvider();
  const { data, isLoading } = useGetProjects();

  const projects = (data?.data || []) as ProjectProps[];

  return (
    <div>
      <MainHeader />

      <section className="section-p">
        <div className="container-x">
          {/* Head */}
          <div className="flex mb-8 items-center justify-between">
            <h2 className="text-xl">My workspace</h2>
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
              Most Used
            </Button>
          </header>

          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="p-4 md:p-6 rounded-lg border border-muted w-full sm:max-w-sm">
              <h3 className="text-lg">Workspace Status</h3>
              <div className="my-2 flex gap-2 items-center">
                <div className="size-14 rounded-md bg-danger flex-center">
                  Wj
                </div>
                <div>
                  <h5>{user?.name}</h5>
                  <p>{user?.email}</p>
                </div>
              </div>
              {/* Project Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Active Projects</span>
                  </div>
                  <span className="font-medium">{projects.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-medium">{projects.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Pending Review</span>
                  </div>
                  <span className="font-medium">{0}</span>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-4 pt-4 border-t border-muted flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last updated {projects[0]?.updatedAt}</span>
              </div>
            </div>
            {!isLoading && !projects.length && (
              <div className="p-8 flex-center gap-4 border w-full border-muted rounded-lg">
                <div className="flex-center flex-col gap-4">
                  <div className="w-12">
                    <Image src={IconFile} alt="app logo" />
                  </div>
                  <p>No Projects Found</p>
                  <Link
                    to={"/new-project"}
                    className="btn btn-primary rounded-full p-4">
                    Create Project
                  </Link>
                </div>
              </div>
            )}
            {isLoading && !projects.length && (
              <div className="p-8 flex-center gap-4 border w-full border-muted rounded-lg">
                <Loader2 className="animate-spin" />
                <p>Loading Projects</p>
              </div>
            )}
            {!!projects.length && (
              <div className="flex">
                {/* Item */}
                {projects.map((data) => (
                  <ProjectCard key={data.id} {...data} />
                ))}
              </div>
            )}
          </div>
          {/* List Workspaces */}
        </div>
      </section>
    </div>
  );
}
