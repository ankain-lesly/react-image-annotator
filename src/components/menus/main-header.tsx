import { BiPhotoAlbum } from "react-icons/bi";
import { Link } from "react-router-dom";

export function MainHeader() {
  return (
    <header>
      <nav className="bg-gray-800 text-white">
        <div className="container-x h-16 mx-auto flex justify-between items-center">
          <Link to="/" className="font-krona font-normal flex-center gap-2">
            <BiPhotoAlbum />
            Annotator
          </Link>
          <nav className="space-x-4">
            <Link to="/workspace">Dashboard</Link>
            <Link to="#">Sign Up</Link>
          </nav>
        </div>
      </nav>
    </header>
  );
}
