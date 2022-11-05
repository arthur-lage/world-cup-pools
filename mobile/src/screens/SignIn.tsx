import { Center, Icon, Text, VStack } from "native-base";

import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center background="gray.900" flex={1}>
      <Logo width={212} height={40} />

      <VStack alignItems={"center"} justifyContent="center" marginTop={16}>
        <Button
          isLoading={isUserLoading}
          onPress={signIn}
          type="SECONDARY"
          title={"ENTRAR COM GOOGLE"}
          leftIcon={
            <Icon as={Fontisto} name="google" size="md" color="white" />
          }
        />

        <Text
          width={280}
          lineHeight={22.4}
          textAlign="center"
          color="gray.200"
          fontSize="sm"
          fontFamily="body"
          marginTop={4}
        >
          Não utilizamos nenhuma informação além do seu e-mail para criação de
          sua conta.
        </Text>
      </VStack>
    </Center>
  );
}
