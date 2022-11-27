import React, { createContext } from "react";
import { useLocation } from "react-router-dom";

import { storage } from "../services";
import { IUser } from "../types";

interface IContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logout: () => void;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const pathname = useLocation();

  const logout = () => {
    setUser(null);
    storage.REMOVE("token");
  };

  React.useEffect(() => {
    const token = storage.GET<string>("token");
    if (!!token) {
      const user: IUser | null = storage.GET("user") || null;
      setUser(user);
    }
  }, []);

  React.useEffect(() => {
    const token = storage.GET<string>("token");
    if (!token && user) {
      setUser(null);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
