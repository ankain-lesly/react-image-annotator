import { Navigate } from "react-router-dom";
import { useContextProvider } from "../../store/context-provider";

interface Props {
  layout: () => JSX.Element;
}

const AuthWrapper = ({ layout: Layout }: Props) => {
  const { user } = useContextProvider();
  if (!user) return <Navigate to="/login" />;

  return <Layout />;
};

export default AuthWrapper;
