import { createContext, ReactNode, useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

// @ts-ignore
import { CLIENT_ID } from "@env";

export interface User {
  name: string;
  avatarUrl?: string;
}

export interface AuthContextProps {
  user: User | null;
  isUserLoading: boolean
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

const redirectUri = "https://auth.expo.io/@arthur-lage/nlw-copa";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: String(CLIENT_ID),
    redirectUri,
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true)
      
      await promptAsync()
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle (access_token: string) {
    console.log(access_token)
  }

  useEffect(() => {
    if(response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  const value = {
    user,
    isUserLoading,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
