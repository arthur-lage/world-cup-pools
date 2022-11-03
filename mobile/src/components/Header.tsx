import { View, Text, Button, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
  text: string;
  canGoBack?: boolean;
}

export function Header({ text, canGoBack = false }: HeaderProps) {
  return (
    <View
      marginBottom={10}
      bgColor="gray.800"
      pb={8}
      pt={16}
      alignItems="center"
      flexDirection={canGoBack ? "row" : "column"}
      justifyContent={canGoBack ? "space-between" : "center"}
    >
      {canGoBack && (
        <Button
          width={6}
          height={6}
          _pressed={{ bg: "transparent" }}
          bg={"transparent"}
          marginLeft={5}
        >
          <Icon
            as={FontAwesome}
            name="chevron-left"
            color="gray.300"
            size={5}
          />
        </Button>
      )}

      <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
        {text}
      </Text>

      {canGoBack && <View width={5} height={0} marginRight={10}></View>}
    </View>
  );
}
