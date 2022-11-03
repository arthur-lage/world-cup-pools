import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../contexts/AuthContext";

export function useAuth(): AuthContextProps {
  const value = useContext(AuthContext);

  return value;
}
