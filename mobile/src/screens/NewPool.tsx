import { View, VStack, Text } from "native-base";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Header } from "../components/Header";

export function NewPool() {
  return (
    <View flex={1}>
      <Header text={"Criar novo bolão"} />

      <VStack px={8} alignItems="center">
        <Logo width={133.2} height={24} />

        <Text
          textAlign="center"
          fontFamily={"heading"}
          fontSize="xl"
          my={8}
          width={335}
          color="white"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Text>

        <Input placeholder="Qual o nome do seu bolão?" />

        <Button
          width="full"
          marginTop={2}
          title="CRIAR MEU BOLÃO"
          type="PRIMARY"
        />

        <Text
          marginTop={5}
          textAlign="center"
          color="gray.200"
          fontFamily="body"
          width={279}
          fontSize="sm"
        >
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </View>
  );
}
