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
// import useTheme from "@/hooks/use-theme";

const defaultStore: StoreProps = {
  theme: "light",
  notifications: 0,
};

export const StateContext = createContext<ContextProps>({
  modal: null,
  user: null,
  token: null,
  project: null,
  store: defaultStore,
  setToken: () => {},
  setStore: () => {},
  setModal: () => {},
  setUser: () => {},
  setProject: () => {},
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  // const hasToken = !!getStorage("ACCESS_TOKEN");
  // const { data, error, refetch } = useInitializeStore(hasToken);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [modal, _setModal] = useState<ModalPropsMain | null>(null);
  const [token, _setToken] = useState(getStorage("ACCESS_TOKEN"));
  const [user, _setUser] = useState<UserProps | null>(null);
  const [store, _setStore] = useState<StoreProps>(defaultStore);
  const [project, _setProject] = useState<ProjectProps | null>(null);

  // const [user, _setUser] = useState<UserProps | null>({
  //   name: "Test name",
  //   email: "test@example.com",
  //   type: "customer",
  //   photo: "",
  // });

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
        photo: data.photo || "",
        type: data.type,
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

  // STORE
  const setStore = (props: StoreProps) => {
    if (!props || typeof props != "object") _setStore(defaultStore);
    else _setStore((prev) => ({ ...prev, ...props }));
  };
  // STORE
  const setProject = (data: ProjectProps | null) => {
    _setProject(data);
  };

  useEffect(() => {
    const theme = getStorage("APP_THEME") || "system";
    setStore({ theme } as StoreProps);

    // if (data) {
    //   const { user, ...others } = data.data as UserGlobalProps & {
    //     user: UserProps;
    //   };
    //   setUser(user);
    //   setStore(others as UserGlobalProps);
    //   setHasLoaded(true);
    // } else if (!hasToken) {
    //   setHasLoaded(true);
    // }
    setHasLoaded(true);
    // }, [data, error]);
  }, []);
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        modal,
        setModal,
        store,
        setStore,
        project,
        setProject,
      }}>
      {/* {user || error ? children : <InitialPageLoader />} */}
      {hasLoaded ? children : <InitialPageLoader />}
    </StateContext.Provider>
  );
};

export const useContextProvider = () => useContext(StateContext);
