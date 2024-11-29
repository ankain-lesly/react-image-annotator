import { MainHeader } from "@/components/menus/main-header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-dark min-h-screen">
      <MainHeader />

      <div className="flex-center h-screen text-white">
        <div className="flex-center flex-col p-6 rounded-3xl bg-dark-l_">
          <h1>🖐</h1>
          <h4 className="mb-4">
            Welcome to <span className="text-warning">Annotator</span>
          </h4>
          <Link
            to={"/new-project"}
            className="btn btn-primary p-5 rounded-full">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
