import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useContextProvider } from "@/store/context-provider";
import { IconFile } from "@/assets";
import { User2 } from "lucide-react";

export function MainHeader() {
  const { user } = useContextProvider();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="bg-gray-800 text-white">
        <div className="container-x h-16 mx-auto flex justify-between items-center">
          <Link to="/" className="font-krona font-normal flex-center gap-2">
            <img src={IconFile} className="w-10" />
            <p className="hidden md:block">Annotator</p>
          </Link>

          {user ? (
            <nav className="flex items-center gap-4">
              <Link to="/workspace">Dashboard</Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex-center gap-2">
                    <User2 className="w-5" />
                    <p className="text-sm">{user?.name.split(" ").pop()}</p>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="z-30 bg-dark cursor-pointer">
                  <DropdownMenuItem>{user?.name}</DropdownMenuItem>

                  <DropdownMenuItem>{user?.email}</DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate("/workspace")}>
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate("/workspace")}>
                    Projects
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate("/logout")}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          ) : (
            <nav className="space-x-4">
              <Link to="/register">Sign Up</Link>
              <Button onClick={() => navigate("/login")}>Sign In</Button>
            </nav>
          )}
        </div>
      </nav>
    </header>
  );
}
