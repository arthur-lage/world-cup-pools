import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyPools } from "../screens/MyPools";
import { NewPool } from "../screens/NewPool";
import { SignIn } from "../screens/SignIn";
import { FindPoolByCode } from "../screens/FindPoolByCode";

import { useTheme } from "native-base";

const { Navigator, Screen } = createBottomTabNavigator();

import { SoccerBall, PlusCircle } from "phosphor-react-native";
import { Platform } from "react-native";

export function AppRoutes() {
  const { colors, sizes, fontSizes, fonts } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarLabelPosition: "beside-icon",
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          // @ts-ignore
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS == "android" ? -10 : 0,
        },
        tabBarLabelStyle: {
          //@ts-ignore
          fontFamily: fonts.medium,
          fontSize: fontSizes.md,
        },
      }}
    >
      <Screen
        name="new-pool"
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle size={sizes[6]} color={color} />
          ),
          tabBarLabel: "Novo bolão",
        }}
        component={NewPool}
      />
      
      <Screen
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall size={sizes[6]} color={color} />
          ),
          tabBarLabel: "Meus bolões",
        }}
        name="my-pools"
        component={MyPools}
      />

      <Screen
        options={{ tabBarButton: () => null }}
        name="sign-in"
        component={SignIn}
      />

      <Screen
        options={{ tabBarButton: () => null }}
        name="find-pool-by-code"
        component={FindPoolByCode}
      />
    </Navigator>
  );
}
