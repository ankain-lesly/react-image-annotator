import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStorage, setStorage, removeStorage } from "../lib/local-storage";
// import { useInitializeStore } from "../api/query/user-service";
import InitialPageLoader from "@/components/loaders/initial-app-loader";
import { useInitializeStore } from "@/api/services/auth-services";
// import useTheme from "@/hooks/use-theme";

export const StateContext = createContext<ContextProps>({
  modal: null,
  user: null,
  token: null,
  setToken: () => {},
  setModal: () => {},
  setUser: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const hasToken = !!getStorage("ACCESS_TOKEN");
  const { data, error } = useInitializeStore(hasToken);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [modal, _setModal] = useState<ModalPropsMain | null>(null);
  const [token, _setToken] = useState(getStorage("ACCESS_TOKEN"));
  const [user, _setUser] = useState<UserProps | null>(null);

  // Handle User
  const setUser = (data: UserProps | null) => {
    if (!data) {
      _setUser(null);
    } else {
      // refetch(); TODO:
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        userId: data.userId,
      };
      _setUser(user as UserProps);
    }
  };

  const setToken = (token?: string) => {
    if (!token) {
      removeStorage("ACCESS_TOKEN");
      _setToken(null);
    } else {
      setStorage("ACCESS_TOKEN", token);
      _setToken(token);
    }
  };

  // Handle MODAL
  const setModal = (modal: ModalPropsMain | null) => {
    _setModal(
      modal
        ? {
            ...modal,
            options: modal.options ? modal.options : {},
          }
        : null
    );
  };

  useEffect(() => {
    if (data) {
      const user = data.data as UserProps;
      setUser(user);
      setHasLoaded(true);
    } else if (!hasToken) {
      setHasLoaded(true);
    }
  }, [data, error, hasToken]);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        modal,
        setModal,
      }}>
      {/* {user || error ? children : <InitialPageLoader />} */}
      {hasLoaded ? children : <InitialPageLoader />}
    </StateContext.Provider>
  );
};

export const useContextProvider = () => useContext(StateContext);
