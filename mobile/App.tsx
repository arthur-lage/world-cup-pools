import { Center, NativeBaseProvider, StatusBar } from "native-base";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";

import { Loading } from "./src/components/Loading";

import { SignIn } from "./src/screens/SignIn";
import { AuthProvider } from "./src/contexts/AuthContext";
import { NewPool } from "./src/screens/NewPool";
import { MyPools } from "./src/screens/MyPools";
import { FindPoolByCode } from "./src/screens/FindPoolByCode";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>
        <Center bgColor="gray.900" flex={1}>
          {!fontsLoaded ? <Loading /> : <FindPoolByCode />}
        </Center>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
