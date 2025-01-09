import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Toast
import { toast } from "react-hot-toast";
import { useContextProvider } from "../../store/context-provider";
import { logout } from "../../api/services/auth-services";

const Logout = () => {
  const { setUser, setToken } = useContextProvider();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await logout();
    setUser(null);
    setToken(null);
    toast.success("You have been logged out..");
    navigate("/login");
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="text-center p-5 bg-dark text-white h-screen">
      <p className="text-sm">Logging Out ..</p>
    </div>
  );
};

export default Logout;
