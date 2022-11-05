import { createContext, ReactNode, useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

// @ts-ignore
import { CLIENT_ID } from "@env";
import { api } from "../services/api";

export interface User {
  name: string;
  avatarUrl?: string;
}

export interface AuthContextProps {
  user: User | null;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

const redirectUri = "https://auth.expo.io/@arthur-lage/nlw-copa";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: String(CLIENT_ID),
    redirectUri,
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post("/users", {
        access_token,
      });

      api.defaults.headers.common["Authorization"] =
        "Bearer " + tokenResponse.data.token;

      const userInfo = await api.get("/me");

      setUser(userInfo.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  const value = {
    user,
    isUserLoading,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
