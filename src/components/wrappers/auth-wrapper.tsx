"use client";

import { ReactNode, useEffect, useState } from "react";
import { useContextProvider } from "../../providers/context-provider";
import { useRouter } from "next/navigation";
import { isAdmin, isUser } from "@/lib/utils";

interface Props {
  layout?: () => JSX.Element;
  middleware?: UserTypes;
  children?: ReactNode;
}

const AuthWrapper = ({ layout: Layout, middleware, children }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { user } = useContextProvider();
  const router = useRouter();

  useEffect(() => {
    // >> user
    if (!user || !user?.type) router.push("/login");
    // toast.error("Please login to continue..."),
    // >> user
    else if (middleware == "user" && !isUser(user.type))
      router.push("/dashboard");
    // toast.error("You are not a seller..."),
    // >> admin
    else if (middleware == "admin" && !isAdmin(user.type))
      router.push("/dashboard");
    // toast.error("You are not an admin..."),
    else setIsLoaded(true);
  }, [user, router, middleware]);

  if (!isLoaded) return null;
  // (
  //   <h4 className="text-center p-10 text-sm font-extrabold">Processing..</h4>
  // );

  return (
    <>
      {Layout && <Layout />}
      {children}
    </>
  );
};

export default AuthWrapper;
