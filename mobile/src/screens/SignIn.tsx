import { Button, Center, Icon, Text, VStack } from "native-base";

import Logo from "../assets/logo.svg";

export function SignIn() {
  return (
    <Center flex={1}>
      {/* <Logo /> */}

      <VStack alignItems={"center"} justifyContent="center" marginTop={12}>
        <Button
          width={320}
          paddingY={18}
          borderRadius={4}
          bgColor="red.500"
          textAlign="center"
        >
          <Text fontSize="sm" fontFamily="heading" color="white">
            ENTRAR COM GOOGLE
          </Text>
        </Button>
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
